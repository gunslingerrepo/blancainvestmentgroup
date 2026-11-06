# Blanca Investment Limited: Corporate Website

Production website for **Blanca Investment Limited**, Abuja: renewable energy, real estate & property management, building construction, office supplies & procurement, and automation & ICT.

Built with **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Lucide icons · Zod · Nodemailer/Resend**. Fonts (Outfit for headings, DM Sans for body) are self-hosted via Fontsource, with no Google Fonts request at runtime.

---

## 1. What's included

| Page | Route | Highlights |
|---|---|---|
| Home | `/` | Solar-farm hero, sector index strip, statistics band, editorial intro, interactive services index, company overview, "Why choose us", closing CTA, LocalBusiness JSON-LD |
| About Us | `/about` | Story, mission & vision, four core values, 4-step process, 6-person team (placeholders) |
| Services | `/services` | Sticky in-page nav, five detailed service sections with 4 key points + "Learn More", additional services |
| Projects | `/projects` | Apo 3-bedroom flats (now selling: gallery, facts, prices, floor plan) and Proposed Residential Estate, Abuja (5-image gallery); status filter; enquiry links pre-fill the quote form |
| Property Management | `/property-management` | "Your Property, Our Priority", 6 property services, audiences, 4-step "How it works", "Looking for Property?" CTA |
| Renewable Energy | `/renewable-energy` | "Power Your World with Solar", system diagram, 6 solutions, qualified benefits, **interactive solar sizing guide** that pre-fills the quote form |
| Contact Us | `/contact` | Tabbed **Request a Quote** and **Submit a Complaint** forms, contact card, WhatsApp, Google Map. No closing CTA (per spec) |
| Privacy Policy | `/privacy-policy` | Draft aligned to the Nigeria Data Protection Act 2023 |
| Terms of Service | `/terms-of-service` | Draft website terms |
| 404 | any unknown URL | Branded not-found page |

Site-wide: sticky header with active-page indicator, clickable phone, "Get a Quote" button; full-screen accessible mobile menu (focus trap, Escape to close, scroll lock); floating WhatsApp button; footer with all five services, contact details and dedicated policy links; toast notifications; scroll-reveal animations (respecting `prefers-reduced-motion`); hover transitions at the specified 1.2 s (red → black, white/outline → red, subtle image/button zoom).

SEO: unique title + description + canonical per page, Open Graph and Twitter cards with a branded 1200×630 image, `sitemap.xml`, `robots.txt` (API routes disallowed), LocalBusiness structured data, descriptive alt text on all images, favicon/app icons from the logo mark.

---

## 2. Local setup

Requirements: **Node.js 20+** (tested on Node 22) and npm.

```bash
npm install
cp .env.example .env.local      # then fill in email settings (see §4)
npm run dev                     # http://localhost:3000
```

Production build:

```bash
npm run build
npm start                       # serves the production build on port 3000
```

Quality checks: `npm run lint` and `npx tsc --noEmit`.

---

## 3. Editing content

Almost everything the business will change lives in **`src/content/site.ts`**:

- `site`: company name, address, phone, email, WhatsApp number, opening hours
- `services`: the five service areas (titles, descriptions, key points, images)
- `projects`: project details, galleries, prices and floor plan (supplied by Blanca)
- `productGroups`: product catalogue shown on Services and the home page
- `partners`: partner logos (Besab Homes Limited)
- `stats`: homepage statistics (348 projects, 6 years, 207 clients, as confirmed by Blanca)
- `leadership`, `divisions`: the team chart on the About page
- `img`: photo sources


Images: put real photographs in `public/images/` and reference them as `/images/your-file.jpg`. Use landscape images at least 1600 px wide for heroes.

Logo: `public/brand/logo.png` (on light backgrounds) and `public/brand/logo-light.png` (on dark backgrounds). Both are the supplied logo with "RC 1760644" removed and a transparent background.

---

## 4. Forms (quote and complaint)

Both forms are validated in the browser (Zod schemas in `src/lib/forms.ts`) and give each submission a reference number such as `BIL-Q-20261106-7K2D`. Until a delivery method is set up, the forms **do not pretend to work**: visitors see a "not sent" message with the phone number, email and WhatsApp instead.

There are two ways to deliver submissions. Use **one**.

### Option 1: Formspree (simplest, recommended)

1. Create a free account at formspree.io and create a form called "Website quotes" (and optionally a second one called "Website complaints"). Set the notification email to `info@blancainvestmentltd.co`.
2. Copy each form's ID: the part after `/f/` in its endpoint, e.g. `https://formspree.io/f/abcdwxyz` → `abcdwxyz`.
3. In Vercel: **Project → Settings → Environment Variables**, add
   - `NEXT_PUBLIC_FORMSPREE_QUOTE_ID` = the quote form ID
   - `NEXT_PUBLIC_FORMSPREE_COMPLAINT_ID` = the complaint form ID (optional; complaints use the quote form if left out)
4. **Redeploy** (Deployments → ⋯ → Redeploy). These values are built into the site, so a redeploy is required after any change.
5. Submit one test quote and one test complaint on the live site. The first submission to a new Formspree form may ask you to confirm the form by email.

What Formspree receives: every form field, the reference number, a subject line such as "Quote request: Building Construction from Ada Obi (BIL-Q-…)", and the visitor's email (so **Reply** in your inbox reaches them). Bots are filtered with Formspree's `_gotcha` honeypot. Confirmation emails to visitors are a Formspree autoresponse setting (available on paid Formspree plans).

### Option 2: Built-in email (Resend or SMTP)

Used only when no Formspree ID is set. Forms post to `/api/quote` and `/api/complaint`, which re-validate on the server, email the company inbox (with Reply, Call and WhatsApp buttons) and send the visitor a confirmation with their reference number. Includes a honeypot and a per-IP rate limit (`FORM_RATE_LIMIT`, default 5 per 10 minutes).

Set these environment variables:

- **Resend:** `RESEND_API_KEY`, and `MAIL_FROM="Blanca Investment Website <no-reply@blancainvestmentltd.co>"` on a domain verified in Resend.
- **or SMTP** (Zoho, Google Workspace, Microsoft 365, cPanel…): `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`.
- `CONTACT_TO_EMAIL` (defaults to `info@blancainvestmentltd.co`), optional `COMPLAINTS_TO_EMAIL`, `SEND_CONFIRMATION_EMAIL=true`.

Make sure the sending domain has SPF and DKIM records, or messages may land in spam.

---

## 5. Deployment

### Vercel (recommended)

**Option A: from GitHub (best for future updates)**
1. Create a new GitHub repository and upload the contents of this folder (not the folder itself), so `package.json` is at the top level.
2. In Vercel: **Add New → Project**, import the repository. Vercel detects Next.js automatically; keep the default build settings.
3. Under **Environment Variables**, add `NEXT_PUBLIC_SITE_URL=https://blancainvestmentgroup.com` (and the Formspree IDs once you have them, see §4).
4. Click **Deploy**. You get a working `*.vercel.app` link in a couple of minutes.

**Option B: Vercel CLI (no GitHub)**
```bash
npm i -g vercel
cd blanca-investment
vercel          # first deploy, follow the prompts
vercel --prod   # production deploy
```

**Custom domain:** Project → **Settings → Domains** → add `blancainvestmentgroup.com` and `www.blancainvestmentgroup.com` (set `www` to redirect to the main domain), then add the DNS records Vercel shows at your domain registrar. The email address stays info@blancainvestmentltd.co, so do not change that domain's mail (MX) records. Keep `NEXT_PUBLIC_SITE_URL` matching the final domain and redeploy.

### Any Node host (VPS, cPanel with Node, Render, Railway…)
```bash
npm ci
npm run build
NODE_ENV=production PORT=3000 npm start   # run behind Nginx/Apache with HTTPS, managed by pm2 or systemd
```
Remote Unsplash images are optimised by Next.js on the server, so the host must allow outbound HTTPS to `images.unsplash.com` (or replace them with local images in `public/images/`).

> Static-only hosting (plain shared hosting without Node) is **not** suitable as-is, because the forms need the server API routes.

### After launch
- Submit `https://blancainvestmentgroup.com/sitemap.xml` in **Google Search Console** and request indexing.
- Create/verify a **Google Business Profile** with the same name, address and phone.
- Optionally add analytics (e.g. Vercel Analytics, Plausible or GA4), and update the Privacy Policy if you do.

---

## 6. Content to confirm before launch

| Item | Where | Note |
|---|---|---|
| General Manager / COO name ("Khalifa Hassan") and "Hafiz Kabir" spelling | About, team chart | Confirm full names |
| Project details, prices and completion date | Projects | From Blanca's flyer and drawings; prices carry a "confirm current prices" note |
| Statistics (348 projects, 6 years, 207 clients) | Home | Supplied by Blanca |
| Product descriptions (one line each) | Services, Products | Written for the site; confirm |
| Address, phone, email, hours, WhatsApp | Site-wide | Confirm accuracy |
| Privacy Policy, Terms of Service | Legal pages | Drafts; legal review recommended |

Photography: Blanca's own photos and renders are in `public/images/` and `public/images/projects/`; the remaining photos are free-licence Unsplash images.

---

## 7. External services

| Service | Purpose | Required? |
|---|---|---|
| Formspree **or** Resend/SMTP | Delivering form submissions | **Yes** (one of them) |
| Domain DNS (SPF/DKIM/DMARC) | Email deliverability, domain connection | **Yes** |
| Hosting (Vercel or Node host) | Running the site and API routes | **Yes** |
| WhatsApp (wa.me) | Click-to-chat links to +234 911 444 2122 | Uses the business's WhatsApp account; no setup |
| Google Maps embed | Map on Contact page | No key needed |
| Unsplash | Stock photography (free licence) | No key needed |
| Google Search Console / Business Profile | Search visibility | Recommended |

---

## 8. Project structure

```
src/
  app/                    routes (one folder per page), api/quote, api/complaint,
                          sitemap.ts, robots.ts, icons, opengraph image
  components/             Header, Footer, PageHero, CtaBand, ServicesIndex, ServicePhoto,
                          SolarEstimator, Toast, Photo (image with graceful fallback)…
  components/forms/       QuoteForm, ComplaintForm, ContactTabs, shared fields & submit hook
  content/site.ts         ← all editable company content
  lib/forms.ts            shared validation schemas & option lists
  lib/mailer.ts           Resend / SMTP transport
  lib/email-templates.ts  staff notification + client confirmation emails
  lib/submit.ts           rate limit, reference numbers, delivery logic
public/brand, public/images
docs/TESTING-REPORT.md    functionality testing report
```
