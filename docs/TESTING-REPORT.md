# Functionality Testing Report, Blanca Investment Limited Website

> **Update, 6 November 2026.** Since this report the site gained a Projects page (status filter, galleries, prices, floor plan), a products catalogue, a partners section, a text-only team chart and optional Formspree form delivery. Rechecked after these changes: production build, type check and lint pass; all pages load with no script errors; no horizontal scrolling at 390 px; project filter, full-screen gallery, floor plan viewer and enquiry links (which pre-fill the quote form) work; a quote submitted with a Formspree ID set posts the correct fields to Formspree and shows the reference number (tested against a simulated Formspree response, so a live test after connecting Formspree is still required).

**Date:** 5 November 2026  
**Build:** Next.js 15.5 production build (`npm run build && npm start`)  
**Method:** automated end-to-end tests in headless Chromium (Playwright) against the production server, desktop (1440×900) and mobile (iPhone SE, 375px). Email delivery was tested end-to-end through a real SMTP server running locally, capturing every message sent.

## Summary

**53 passed · 0 failed** out of 53 checks. `npm run lint` and `tsc --noEmit` are clean.

Defects found and fixed during testing: Open Graph image missing on sub-pages; mobile menu not closing immediately after navigation; service-specific form errors only appearing after other fields were fixed; unfriendly server message for a missing phone field; large featured-project card leaving empty space; navigation wrapping at 1440px.

## Results


### Pages & SEO

| Result | Check | Notes |
|---|---|---|
| ✅ Pass | / loads with unique title, description, canonical, OG, one h1, alt text | title="Blanca Investment Limited \| Building a Sustainable Future for Nigeria" \| active nav="Home" |
| ✅ Pass | /about loads with unique title, description, canonical, OG, one h1, alt text | title="About Us \| Blanca Investment Limited" \| active nav="About Us" |
| ✅ Pass | /services loads with unique title, description, canonical, OG, one h1, alt text | title="Services \| Blanca Investment Limited" \| active nav="Services" |
| ✅ Pass | /projects loads with unique title, description, canonical, OG, one h1, alt text | title="Projects \| Blanca Investment Limited" \| active nav="Projects" |
| ✅ Pass | /property-management loads with unique title, description, canonical, OG, one h1, alt text | title="Property Management \| Blanca Investment Limited" \| active nav="Property Management" |
| ✅ Pass | /renewable-energy loads with unique title, description, canonical, OG, one h1, alt text | title="Renewable Energy & Solar Installation \| Blanca Investment Limited" \| active nav="Renewable Energy" |
| ✅ Pass | /contact loads with unique title, description, canonical, OG, one h1, alt text | title="Contact Us, Request a Quote \| Blanca Investment Limited" \| active nav="Contact Us" |
| ✅ Pass | /privacy-policy loads with unique title, description, canonical, OG, one h1, alt text | title="Privacy Policy \| Blanca Investment Limited" \| active nav="-" |
| ✅ Pass | /terms-of-service loads with unique title, description, canonical, OG, one h1, alt text | title="Terms of Service \| Blanca Investment Limited" \| active nav="-" |
| ✅ Pass | Titles are unique across pages | 9 unique titles |

### Links

| Result | Check | Notes |
|---|---|---|
| ✅ Pass | Every internal link resolves (HTTP 200) | 9 unique internal URLs checked |
| ✅ Pass | Telephone, email and WhatsApp links are correct | https://wa.me/2349114442122?text=Hello%20Blanca%20Investment%20Limited%2C%20I%20would%20like%20to%20make%20an%20enquiry. |
| ✅ Pass | Footer Privacy Policy and Terms go to dedicated pages | Renewable Energy, Real Estate & Property, Building Construction, Office Supplies & Procurement, Automation & ICT |
| ✅ Pass | Logo links to Home; "Get a Quote" opens quote form |  |
| ✅ Pass | Footer "Submit a Complaint" opens the complaint tab |  |

### SEO files

| Result | Check | Notes |
|---|---|---|
| ✅ Pass | robots.txt and sitemap.xml | sitemap has 9 URLs |
| ✅ Pass | Home page has LocalBusiness JSON-LD with correct contact data |  |

### Projects filter

| Result | Check | Notes |
|---|---|---|
| ✅ Pass | All / Ongoing / Completed filters show correct cards and counts | all=9, ongoing=4, completed=4 |
| ✅ Pass | Sector filter + shareable URL + empty state reset | URL ?status=completed&sector=automation-ict restored filters; renewable sector → 3 cards |

### Solar estimator

| Result | Check | Notes |
|---|---|---|
| ✅ Pass | Changing appliances updates estimate and quote link carries figures | prefilled kW=2.6 |

### Quote form

| Result | Check | Notes |
|---|---|---|
| ✅ Pass | Empty submit shows inline errors, focuses first invalid field, no request sent | Please enter your full name. \| Please enter your email address. \| Please enter your telephone number. \| Please choose a service. \| Please tell us a little more (at least 10 characters). \| Please confirm you agree to |
| ✅ Pass | Invalid email / phone rejected; errors clear when fixed |  |
| ✅ Pass | Service-specific fields + required rule: renewable-energy | shown: What do you need? / Proposed system size (kW) / Appliances you want to power / Other appliances or notes |
| ✅ Pass | Service-specific fields + required rule: real-estate | shown: I'm interested in / Preferred location / Budget range |
| ✅ Pass | Service-specific fields + required rule: construction | shown: Project type / Project location / Preferred start / timeline / Budget range |
| ✅ Pass | Service-specific fields + required rule: office-supplies | shown: Items required / Quantities / specifications |
| ✅ Pass | Service-specific fields + required rule: automation-ict | shown: Requirements / Type of premises |

### Quote form → email

| Result | Check | Notes |
|---|---|---|
| ✅ Pass | Valid renewable-energy request delivers staff notification + client confirmation | BIL-Q-20261105-HFIP → staff "[BIL-Q-20261105-HFIP] Quote request, Renewable Energy, Ada Test" \| client "We've received your quote request [BIL-Q-20261105-HFIP]" |
| ✅ Pass | Valid real-estate request delivers staff notification + client confirmation | BIL-Q-20261105-YD1V → staff "[BIL-Q-20261105-YD1V] Quote request, Real Estate & Property, Ada Test" \| client "We've received your quote request [BIL-Q-20261105-YD1V]" |
| ✅ Pass | Valid construction request delivers staff notification + client confirmation | BIL-Q-20261105-G0C1 → staff "[BIL-Q-20261105-G0C1] Quote request, Building Construction, Ada Test" \| client "We've received your quote request [BIL-Q-20261105-G0C1]" |
| ✅ Pass | Valid office-supplies request delivers staff notification + client confirmation | BIL-Q-20261105-XW1Y → staff "[BIL-Q-20261105-XW1Y] Quote request, Office Supplies & Procurement, Ada Test" \| client "We've received your quote request [BIL-Q-20261105-XW1Y]" |
| ✅ Pass | Valid automation-ict request delivers staff notification + client confirmation | BIL-Q-20261105-U19D → staff "[BIL-Q-20261105-U19D] Quote request, Automation & ICT, Ada Test" \| client "We've received your quote request [BIL-Q-20261105-U19D]" |
| ✅ Pass | Valid other request delivers staff notification + client confirmation | BIL-Q-20261105-44TR → staff "[BIL-Q-20261105-44TR] Quote request, Other / General enquiry, Ada Test" \| client "We've received your quote request [BIL-Q-20261105-44TR]" |

### Complaint form

| Result | Check | Notes |
|---|---|---|
| ✅ Pass | Validation then successful submission with emails | [BIL-C-20261105-HS6A] Complaint, CCTV camera offline |
| ✅ Pass | Tabs support keyboard arrow navigation |  |

### API

| Result | Check | Notes |
|---|---|---|
| ✅ Pass | Server-side validation rejects bad payload (422 with field errors) | solarType, name, email, phone, consent, message |
| ✅ Pass | Honeypot submissions are accepted silently and not emailed |  |
| ✅ Pass | Malformed JSON returns 400 |  |
| ✅ Pass | Server-side validation reports service-specific and base errors together |  |

### Failure handling

| Result | Check | Notes |
|---|---|---|
| ✅ Pass | Email NOT configured → 503, form shows "not sent" with phone/email/WhatsApp (no false success) | 503 not_configured |
| ✅ Pass | SMTP server unreachable → 502 and visitor told to retry/contact directly | We couldn't send your submission just now. Please try again in a moment, or contact us by phone, email or WhatsApp. |

### Mobile (375px)

| Result | Check | Notes |
|---|---|---|
| ✅ Pass | / has no horizontal overflow |  |
| ✅ Pass | /about has no horizontal overflow |  |
| ✅ Pass | /services has no horizontal overflow |  |
| ✅ Pass | /projects has no horizontal overflow |  |
| ✅ Pass | /property-management has no horizontal overflow |  |
| ✅ Pass | /renewable-energy has no horizontal overflow |  |
| ✅ Pass | /contact has no horizontal overflow |  |
| ✅ Pass | /privacy-policy has no horizontal overflow |  |
| ✅ Pass | /terms-of-service has no horizontal overflow |  |
| ✅ Pass | Menu opens, traps focus, closes on Escape and navigates |  |
| ✅ Pass | Quote form submits on mobile |  |

### Runtime

| Result | Check | Notes |
|---|---|---|
| ✅ Pass | No JavaScript runtime errors during the test run |  |

## What was not (and could not be) tested here

- **Live email delivery to the real inbox** (info@blancainvestmentltd.co). The forms were proven against a real SMTP server, but your chosen provider (Resend or your mailbox's SMTP) must be configured and one live quote + one live complaint sent after deployment. Until that is done, do not treat the forms as live, if email is not configured they correctly refuse and show phone/email/WhatsApp instead.
- **Unsplash photographs**: the test environment blocks external image hosts, so remote photos showed the dark fallback frame during testing. They load normally on a deployed host with internet access (verify after deployment).
- **Google Maps embed** and **WhatsApp** opening on a phone/desktop: link format verified (`https://wa.me/2349114442122?text=…`, opens in a new tab); confirm on a real device that it opens the correct chat.
- **Real devices / browsers**: tested in Chromium only. Spot-check Safari (iPhone) and Chrome (Android) after launch.
- **Search ranking / Google sitelinks**: depend on Google and cannot be tested or guaranteed.

## Post-deployment checklist

1. Set environment variables (see README §4) and redeploy.
2. Submit one quote per service category and one complaint using a personal email; confirm staff notification, Reply-to-Client, and visitor confirmation.
3. Tap the WhatsApp button on a phone; confirm the chat opens with +234 911 444 2122.
4. Tap the phone number on a phone; confirm it dials 0911 444 2122.
5. Check every page on a phone, including the menu.
6. Share the homepage link on WhatsApp/LinkedIn to confirm the preview image.
7. Submit sitemap.xml in Google Search Console.
8. Replace placeholder content (README §6) and set `verified: true`.