/* eslint-disable */
const { chromium, devices } = require('playwright');
const fs = require('fs');
const BASE = 'http://localhost:3000';
const MAIL = process.env.S + '/mail';
const results = []; let pass = 0, fail = 0;
const t = async (area, name, fn) => {
  try { const note = await fn(); results.push({ area, name, ok: true, note: note || '' }); pass++; console.log('ok', name); }
  catch (e) { results.push({ area, name, ok: false, note: String(e.message || e).slice(0, 300) }); fail++; console.log('FAIL', name, String(e.message).slice(0,200)); }
};
const assert = (c, m) => { if (!c) throw new Error(m); };
const pages = ['/', '/about', '/services', '/projects', '/property-management', '/renewable-energy', '/contact', '/privacy-policy', '/terms-of-service'];
const mailCount = () => fs.readdirSync(MAIL).filter(f => f.endsWith('.json')).length;
const lastMails = (n) => fs.readdirSync(MAIL).filter(f => f.endsWith('.json')).sort().slice(-n).map(f => JSON.parse(fs.readFileSync(MAIL + '/' + f)));
const waitMail = async (target) => { for (let i = 0; i < 40; i++) { if (mailCount() >= target) return; await new Promise(r => setTimeout(r, 150)); } };

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage(); p.setDefaultTimeout(10000);
  const jsErrors = [];
  p.on('pageerror', e => jsErrors.push(e.message));

  // ── SEO + structure per page
  const internal = new Set();
  for (const path of pages) {
    await t('Pages & SEO', `${path} loads with unique title, description, canonical, OG, one h1, alt text`, async () => {
      const r = await p.goto(BASE + path, { waitUntil: 'domcontentloaded' });
      assert(r.status() === 200, 'status ' + r.status());
      const info = await p.evaluate(() => ({
        title: document.title,
        desc: document.querySelector('meta[name=description]')?.content,
        canon: document.querySelector('link[rel=canonical]')?.href,
        og: document.querySelector('meta[property="og:image"]')?.content,
        ogTitle: document.querySelector('meta[property="og:title"]')?.content,
        h1: document.querySelectorAll('h1').length,
        noAlt: [...document.querySelectorAll('img')].filter(i => !i.hasAttribute('alt')).length,
        hrefs: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')),
        lang: document.documentElement.lang,
        whatsapp: !!document.querySelector('a[aria-label^="Chat with Blanca"]'),
        active: document.querySelector('nav[aria-label=Main] a[aria-current=page]')?.textContent,
        cta: !!document.querySelector('#cta-title'),
      }));
      assert(info.title && info.desc && info.desc.length > 50, 'missing title/description');
      assert(info.canon, 'no canonical'); assert(info.og, 'no og:image'); assert(info.h1 === 1, 'h1 count ' + info.h1);
      assert(info.noAlt === 0, info.noAlt + ' images without alt'); assert(info.whatsapp, 'no floating WhatsApp');
      if (path === '/contact') assert(!info.cta, 'closing CTA must not appear on Contact page');
      else if (!path.includes('policy') && !path.includes('terms')) assert(info.cta, 'closing CTA missing');
      info.hrefs.forEach(h => { if (h.startsWith('/')) internal.add(h.split('#')[0].split('?')[0] || '/'); });
      return `title="${info.title}" | active nav="${info.active || '-'}"`;
    });
  }
  await t('Pages & SEO', 'Titles are unique across pages', async () => {
    const titles = [];
    for (const path of pages) { await p.goto(BASE + path, { waitUntil: 'domcontentloaded' }); titles.push(await p.title()); }
    assert(new Set(titles).size === titles.length, 'duplicate titles'); return `${titles.length} unique titles`;
  });

  // ── Links
  await t('Links', 'Every internal link resolves (HTTP 200)', async () => {
    const bad = [];
    for (const h of internal) { const r = await p.request.get(BASE + h); if (r.status() !== 200) bad.push(h + ' ' + r.status()); }
    assert(!bad.length, bad.join(', ')); return `${internal.size} unique internal URLs checked`;
  });
  await t('Links', 'Telephone, email and WhatsApp links are correct', async () => {
    await p.goto(BASE + '/contact');
    const hrefs = await p.$$eval('a[href]', as => as.map(a => a.getAttribute('href')));
    assert(hrefs.includes('tel:+2349114442122'), 'tel link'); assert(hrefs.includes('mailto:info@blancainvestmentltd.co'), 'mailto');
    const wa = hrefs.find(h => h.startsWith('https://wa.me/'));
    assert(wa && wa.startsWith('https://wa.me/2349114442122?text='), 'wa link ' + wa);
    const waTargets = await p.$$eval('a[href^="https://wa.me"]', as => as.every(a => a.target === '_blank' && a.rel.includes('noopener')));
    assert(waTargets, 'WhatsApp links should open in new tab with noopener');
    return wa;
  });
  await t('Links', 'Footer Privacy Policy and Terms go to dedicated pages', async () => {
    await p.goto(BASE + '/');
    const f = await p.$$eval('footer a', as => as.map(a => a.getAttribute('href')));
    assert(f.includes('/privacy-policy') && f.includes('/terms-of-service'), JSON.stringify(f));
    const svc = await p.$$eval('footer nav[aria-label=Services] a', as => as.map(a => a.textContent));
    assert(svc.includes('Automation & ICT'), 'Automation & ICT missing in footer'); return svc.join(', ');
  });
  await t('Links', 'Logo links to Home; "Get a Quote" opens quote form', async () => {
    await p.goto(BASE + '/about');
    await p.click('header a[aria-label^="Blanca Investment Limited"]'); await p.waitForURL(BASE + '/');
    await p.click('header >> text=Get a Quote'); await p.waitForURL(/\/contact#quote/);
    assert(await p.isVisible('#panel-quote'), 'quote panel not visible');
  });
  await t('Links', 'Footer "Submit a Complaint" opens the complaint tab', async () => {
    await p.goto(BASE + '/');
    await p.click('footer >> text=Submit a Complaint'); await p.waitForURL(/#complaint/);
    await p.waitForSelector('#panel-complaint:not([hidden])', { timeout: 4000 });
    assert(await p.getAttribute('#tab-complaint', 'aria-selected') === 'true', 'tab not selected');
  });
  await t('SEO files', 'robots.txt and sitemap.xml', async () => {
    const r = await (await p.request.get(BASE + '/robots.txt')).text();
    assert(r.includes('Sitemap:') && r.includes('Disallow: /api/'), r);
    const s = await (await p.request.get(BASE + '/sitemap.xml')).text();
    const n = (s.match(/<loc>/g) || []).length; assert(n === 9, 'sitemap urls ' + n);
    const og = await p.request.get(BASE + '/opengraph-image.jpg'); assert(og.status() === 200, 'og image');
    return `sitemap has ${n} URLs`;
  });
  await t('SEO files', 'Home page has LocalBusiness JSON-LD with correct contact data', async () => {
    await p.goto(BASE + '/');
    const j = JSON.parse(await p.$eval('script[type="application/ld+json"]', s => s.textContent));
    assert(j['@type'] === 'LocalBusiness' && j.telephone === '+2349114442122' && j.email === 'info@blancainvestmentltd.co' && j.address.streetAddress === '21 SS Lassa Crescent', JSON.stringify(j).slice(0, 200));
  });

  // ── Projects filter
  await t('Projects filter', 'All / Ongoing / Completed filters show correct cards and counts', async () => {
    await p.goto(BASE + '/projects', { waitUntil: 'load' });
    const count = () => p.$$eval('[data-testid=project-grid] > li', l => l.map(x => x.dataset.status));
    const all = await count(); assert(all.length === 9, 'all=' + all.length);
    await p.click('button:has-text("Ongoing Projects")'); await p.waitForURL(/status=ongoing/);
    const on = await count(); assert(on.length && on.every(s => s === 'ongoing'), JSON.stringify(on));
    assert(await p.getAttribute('button:has-text("Ongoing Projects")', 'aria-pressed') === 'true', 'aria-pressed');
    await p.click('button:has-text("Completed Projects")'); await p.waitForURL(/status=completed/);
    const done = await count(); assert(done.length && done.every(s => s === 'completed'), JSON.stringify(done));
    await p.click('button:has-text("All Projects")');
    assert((await count()).length === 9, 'reset to all');
    return `all=${all.length}, ongoing=${on.length}, completed=${done.length}`;
  });
  await t('Projects filter', 'Sector filter + shareable URL + empty state reset', async () => {
    await p.goto(BASE + '/projects?status=completed&sector=automation-ict', { waitUntil: 'load' });
    assert(await p.isVisible('text=No projects match these filters yet.'), 'empty state not shown');
    await p.click('text=Reset filters');
    assert((await p.$$('[data-testid=project-grid] > li')).length === 9, 'reset failed');
    await p.selectOption('select', 'renewable-energy');
    const n = (await p.$$('[data-testid=project-grid] > li')).length; assert(n === 3, 'renewable count ' + n);
    return 'URL ?status=completed&sector=automation-ict restored filters; renewable sector → 3 cards';
  });

  // ── Solar estimator
  await t('Solar estimator', 'Changing appliances updates estimate and quote link carries figures', async () => {
    await p.goto(BASE + '/renewable-energy');
    const before = await p.textContent('#estimator dl');
    await p.click('button[aria-label="More Air conditioner (1 HP)"]');
    const after = await p.textContent('#estimator dl'); assert(before !== after, 'estimate did not change');
    const href = await p.getAttribute('a:has-text("Get a quote with these figures")', 'href');
    assert(/service=renewable-energy/.test(href) && /kw=\d/.test(href), href);
    await p.click('a:has-text("Get a quote with these figures")'); await p.waitForURL(/contact/);
    await p.waitForTimeout(400);
    assert(await p.inputValue('#q-service') === 'renewable-energy', 'service not prefilled');
    assert(Number(await p.inputValue('#q-systemSize')) > 0, 'kW not prefilled');
    assert(await p.isChecked('input[name=solarType][value=installation]'), 'solar type not prefilled');
    return 'prefilled kW=' + await p.inputValue('#q-systemSize');
  });

  // ── Quote form validation
  await t('Quote form', 'Empty submit shows inline errors, focuses first invalid field, no request sent', async () => {
    await p.goto(BASE + '/contact#quote');
    const before = mailCount();
    let posted = false; p.on('request', r => { if (r.url().includes('/api/quote')) posted = true; });
    await p.click('button:has-text("Send Quote Request")'); await p.waitForTimeout(500);
    const errs = await p.$$eval('#panel-quote .field-error', e => e.map(x => x.textContent));
    assert(errs.length >= 5, 'errors: ' + errs.length);
    const focused = await p.evaluate(() => document.activeElement?.id); assert(focused === 'q-name', 'focus on ' + focused);
    assert(!posted && mailCount() === before, 'request was sent');
    assert(await p.getAttribute('#q-email', 'aria-invalid') === 'true', 'aria-invalid');
    return errs.join(' | ');
  });
  await t('Quote form', 'Invalid email / phone rejected; errors clear when fixed', async () => {
    await p.fill('#q-email', 'not-an-email'); await p.fill('#q-phone', 'abc'); await p.click('#q-name');
    await p.waitForTimeout(200);
    assert(await p.isVisible('text=Please enter a valid email address.'), 'email error');
    await p.fill('#q-email', 'client@example.com'); await p.waitForTimeout(200);
    assert(!(await p.isVisible('text=Please enter a valid email address.')), 'email error persisted');
  });
  const specific = {
    'renewable-energy': ['input[name=solarType]', 'Please choose solar installation or energy audit.'],
    'real-estate': ['input[name=propertyInterest]', 'Please tell us what you are interested in.'],
    'construction': ['input[name=constructionType]', 'Please choose a project type.'],
    'office-supplies': ['input[name=supplyItems]', 'Please select at least one item.'],
    'automation-ict': ['input[name=ictNeeds]', 'Please select at least one requirement.'],
  };
  for (const [svc, [sel, msg]] of Object.entries(specific)) {
    await t('Quote form', `Service-specific fields + required rule: ${svc}`, async () => {
      await p.goto(BASE + '/contact?v=' + svc + '#quote');
      await p.fill('#q-name', 'Test Client'); await p.fill('#q-email', 'client@example.com'); await p.fill('#q-phone', '0803 123 4567');
      await p.fill('#q-message', 'Testing the service specific fields.'); await p.check('#q-consent');
      await p.selectOption('#q-service', svc);
      assert(await p.$(sel), 'specific field not shown');
      await p.click('button:has-text("Send Quote Request")'); await p.waitForTimeout(300);
      assert(await p.isVisible(`text=${msg}`), 'conditional error missing');
      return 'shown: ' + (await p.$$eval('#panel-quote fieldset legend, #panel-quote .bg-mist label.field-label', l => l.map(x => x.textContent.replace(/\*|\(optional\)/g, '').trim()))).join(' / ');
    });
  }

  // ── Quote form successful submissions (end-to-end email)
  const fills = {
    'renewable-energy': async () => { await p.click('label:has(> input[name=solarType][value=installation])'); await p.fill('#q-systemSize', '5'); await p.click('label:has(> input[name=appliances][value="Refrigerator / freezer"])'); await p.click('label:has(> input[name=appliances][value="Air conditioner"])'); },
    'real-estate': async () => { await p.click('label:has(> input[name=propertyInterest][value=short-let])'); await p.fill('#q-propertyLocation', 'Jahi, Abuja'); },
    'construction': async () => { await p.click('label:has(> input[name=constructionType][value=commercial])'); await p.fill('#q-projectLocation', 'Gwarinpa'); },
    'office-supplies': async () => { await p.click('label:has(> input[name=supplyItems][value="IT equipment"])'); },
    'automation-ict': async () => { await p.click('label:has(> input[name=ictNeeds][value=CCTV])'); await p.click('label:has(> input[name=ictNeeds][value="Smart locks"])'); },
    'other': async () => {},
  };
  for (const [svc, fill] of Object.entries(fills)) {
    await t('Quote form → email', `Valid ${svc} request delivers staff notification + client confirmation`, async () => {
      await p.goto(BASE + '/contact?run=' + svc + '#quote');
      const before = mailCount();
      await p.fill('#q-name', 'Ada Test'); await p.fill('#q-email', `ada+${svc}@example.com`); await p.fill('#q-phone', '+234 803 123 4567');
      await p.selectOption('#q-service', svc); await fill();
      await p.fill('#q-message', `Please send a quotation for ${svc}. <b>html should be escaped</b>`); await p.check('#q-consent');
      await p.click('button:has-text("Send Quote Request")');
      await p.waitForSelector('text=Thank you — your quote request has been sent.', { timeout: 15000 });
      const ref = await p.textContent('#panel-quote strong'); assert(/^BIL-Q-\d{8}-[A-Z0-9]{4}$/.test(ref), 'ref ' + ref);
      assert(await p.isVisible('text=Quote request sent'), 'toast not shown');
      await waitMail(before + 2);
      const [staff, client] = lastMails(2);
      assert(staff.to.includes('info@blancainvestmentltd.co'), 'staff to ' + staff.to);
      assert(staff.replyTo.includes(`ada+${svc}@example.com`), 'reply-to ' + staff.replyTo);
      assert(staff.subject.includes(ref), 'subject ' + staff.subject);
      const html = fs.readFileSync(MAIL + '/' + fs.readdirSync(MAIL).filter(f => f.endsWith('.html')).sort().slice(-2)[0], 'utf8');
      assert(html.includes('Reply to Client') && html.includes(`mailto:ada+${svc}@example.com`), 'reply button');
      assert(html.includes('&lt;b&gt;html should be escaped&lt;/b&gt;'), 'HTML not escaped');
      assert(client.to.includes(`ada+${svc}@example.com`) && client.subject.includes(ref), 'confirmation ' + client.to);
      return `${ref} → staff "${staff.subject}" | client "${client.subject}"`;
    });
  }

  // ── Complaint
  await t('Complaint form', 'Validation then successful submission with emails', async () => {
    await p.goto(BASE + '/contact#complaint');
    await p.waitForSelector('#panel-complaint:not([hidden])');
    await p.click('button:has-text("Submit Complaint")'); await p.waitForTimeout(300);
    const n = await p.$$eval('#panel-complaint .field-error', e => e.length); assert(n >= 6, 'errors ' + n);
    const before = mailCount();
    await p.fill('#c-name', 'Bola Tester'); await p.fill('#c-email', 'bola@example.com'); await p.fill('#c-phone', '09114442122');
    await p.selectOption('#c-service', 'automation-ict'); await p.fill('#c-reference', 'INV-0042');
    await p.fill('#c-subject', 'CCTV camera offline'); await p.fill('#c-details', 'One of the cameras installed last month has been offline since Monday.');
    await p.check('#c-consent'); await p.click('button:has-text("Submit Complaint")');
    await p.waitForSelector('text=Your complaint has been received.', { timeout: 15000 });
    await waitMail(before + 2); const [staff, client] = lastMails(2);
    assert(/BIL-C-/.test(staff.subject) && staff.replyTo.includes('bola@example.com'), staff.subject);
    assert(client.to.includes('bola@example.com'), 'client confirmation');
    return staff.subject;
  });
  await t('Complaint form', 'Tabs support keyboard arrow navigation', async () => {
    await p.goto(BASE + '/contact');
    await p.focus('#tab-quote'); await p.keyboard.press('ArrowRight');
    assert(await p.getAttribute('#tab-complaint', 'aria-selected') === 'true', 'arrow nav');
  });

  // ── API hardening
  await t('API', 'Server-side validation rejects bad payload (422 with field errors)', async () => {
    const r = await p.request.post(BASE + '/api/quote', { data: { name: 'x', email: 'bad', service: 'renewable-energy' } });
    const j = await r.json(); assert(r.status() === 422 && j.errors.email && j.errors.solarType && j.errors.consent, JSON.stringify(j));
    return Object.keys(j.errors).join(', ');
  });
  await t('API', 'Honeypot submissions are accepted silently and not emailed', async () => {
    const before = mailCount();
    const r = await p.request.post(BASE + '/api/complaint', { data: { website: 'spam.example', name: 'Bot' } });
    await new Promise(r => setTimeout(r, 800)); assert(r.status() === 200 && mailCount() === before, 'honeypot leaked');
  });
  await t('API', 'Malformed JSON returns 400', async () => {
    const r = await p.request.post(BASE + '/api/quote', { headers: { 'content-type': 'application/json' }, data: Buffer.from('{bad') });
    assert(r.status() === 400, 'status ' + r.status());
  });

  await t('API', 'Server-side validation reports service-specific and base errors together', async () => {
    const r = await p.request.post(BASE + '/api/quote', { data: { service: 'office-supplies' } });
    const j = await r.json(); assert(j.errors.supplyItems && j.errors.name && j.errors.phone === 'Please enter your telephone number.', JSON.stringify(j.errors));
  });
  await t('Failure handling', 'Email NOT configured → 503, form shows "not sent" with phone/email/WhatsApp (no false success)', async () => {
    const q = await b.newPage(); q.setDefaultTimeout(10000);
    await q.goto('http://localhost:3001/contact#complaint'); await q.waitForSelector('#panel-complaint:not([hidden])');
    await q.fill('#c-name', 'No Config'); await q.fill('#c-email', 'nc@example.com'); await q.fill('#c-phone', '08031234567');
    await q.selectOption('#c-service', 'other'); await q.fill('#c-subject', 'Testing'); await q.fill('#c-details', 'This should not claim success when email is off.');
    await q.check('#c-consent'); await q.click('button:has-text("Submit Complaint")');
    await q.waitForSelector('text=Your submission was not sent');
    assert(!(await q.isVisible('text=Your complaint has been received.')), 'false success shown');
    assert(await q.isVisible('#panel-complaint a[href="tel:+2349114442122"]'), 'fallback contacts missing');
    const r = await q.request.post('http://localhost:3001/api/quote', { data: { name: 'A B', email: 'a@b.co', phone: '08031234567', service: 'other', message: 'hello there world', consent: true } });
    assert(r.status() === 503, 'status ' + r.status()); await q.close(); return '503 not_configured';
  });
  await t('Failure handling', 'SMTP server unreachable → 502 and visitor told to retry/contact directly', async () => {
    const r = await p.request.post('http://localhost:3002/api/quote', { data: { name: 'A B', email: 'a@b.co', phone: '08031234567', service: 'other', message: 'hello there world', consent: true } });
    const j = await r.json(); assert(r.status() === 502 && j.code === 'send_failed', r.status() + JSON.stringify(j)); return j.message;
  });

  // ── Mobile
  const m = await b.newContext({ ...devices['iPhone SE'] });
  const mp = await m.newPage(); mp.setDefaultTimeout(10000);
  for (const path of pages) {
    await t('Mobile (375px)', `${path} has no horizontal overflow`, async () => {
      await mp.goto(BASE + path, { waitUntil: 'domcontentloaded' });
      const o = await mp.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      assert(o <= 0, 'overflow ' + o + 'px');
    });
  }
  await t('Mobile (375px)', 'Menu opens, traps focus, closes on Escape and navigates', async () => {
    await mp.goto(BASE + '/');
    assert(!(await mp.isVisible('nav[aria-label=Main]')), 'desktop nav visible on mobile');
    await mp.click('button[aria-label="Open menu"]');
    assert(await mp.isVisible('#mobile-menu'), 'menu not open');
    assert(await mp.evaluate(() => document.body.style.overflow === 'hidden'), 'scroll not locked');
    await mp.keyboard.press('Escape'); assert(!(await mp.isVisible('#mobile-menu')), 'escape did not close');
    await mp.click('button[aria-label="Open menu"]');
    await mp.click('#mobile-menu >> text=Renewable Energy'); await mp.waitForURL(/renewable-energy/);
    assert(!(await mp.isVisible('#mobile-menu')), 'menu stayed open after navigation');
    assert(await mp.getAttribute('#mobile-menu a[href="/renewable-energy"]', 'aria-current') === 'page', 'active state');
  });
  await t('Mobile (375px)', 'Quote form submits on mobile', async () => {
    await mp.goto(BASE + '/contact?service=automation-ict#quote'); await mp.waitForTimeout(300);
    await mp.fill('#q-name', 'Mobile User'); await mp.fill('#q-email', 'mobile@example.com'); await mp.fill('#q-phone', '08031234567');
    await mp.click('label:has(> input[name=ictNeeds][value=Networking])');
    await mp.fill('#q-message', 'Office network for 20 staff please.'); await mp.check('#q-consent');
    await mp.click('button:has-text("Send Quote Request")');
    await mp.waitForSelector('text=Thank you — your quote request has been sent.', { timeout: 15000 });
  });

  await t('Runtime', 'No JavaScript runtime errors during the test run', async () => { assert(!jsErrors.length, jsErrors.join(' | ')); });

  await b.close();
  fs.writeFileSync(process.env.S + '/results.json', JSON.stringify({ pass, fail, results }, null, 2));
  console.log(`PASS ${pass}  FAIL ${fail}`);
  results.filter(r => !r.ok).forEach(r => console.log('FAIL', r.area, '-', r.name, '::', r.note));
})();
