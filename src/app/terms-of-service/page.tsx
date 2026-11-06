import LegalPage from "@/components/LegalPage";
import SampleNotice from "@/components/SampleNotice";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description: "Terms governing the use of the Blanca Investment Limited website, its content, quotation requests and online forms.",
  path: "/terms-of-service",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="5 November 2026">
      <SampleNotice>These terms are a draft prepared for the website and should be reviewed by Blanca Investment Limited&apos;s legal adviser before launch.</SampleNotice>

      <p>These terms govern your use of this website, operated by {site.name}, {site.address.full}, Nigeria. By using the website you agree to these terms.</p>

      <h2>1. Website information</h2>
      <p>The content on this website is provided for general information about our services. While we aim to keep it accurate and current, it does not constitute professional, technical, financial or legal advice, and it may change without notice.</p>
      <p>Some photography on this website is licensed stock imagery used for illustration and does not depict specific Blanca Investment projects.</p>

      <h2>2. Quotations and estimates</h2>
      <p>Submitting a quote request does not create a contract. Any estimate shown on this website, including the solar sizing guide, is indicative only. Binding prices, specifications, timelines and warranties are set out only in a written quotation or contract issued by {site.name}, and may depend on a site survey.</p>

      <h2>3. Acceptable use</h2>
      <ul>
        <li>Provide accurate information when using our forms.</li>
        <li>Do not submit unlawful, abusive or misleading content, or attempt to interfere with the website&apos;s operation or security.</li>
        <li>Do not use automated tools to submit forms or collect content.</li>
      </ul>

      <h2>4. Intellectual property</h2>
      <p>The Blanca Investment name and logo, and the website&apos;s design and text, belong to {site.name} or its licensors. Third-party photographs are used under their respective licences. You may not reproduce them without permission, except for personal, non-commercial reference.</p>

      <h2>5. Third-party links</h2>
      <p>Links to third-party services such as WhatsApp and Google Maps are provided for convenience. We are not responsible for their content or practices.</p>

      <h2>6. Liability</h2>
      <p>To the extent permitted by law, {site.name} is not liable for any loss arising from reliance on website content or from temporary unavailability of the website. Nothing in these terms limits liability that cannot be limited under Nigerian law.</p>

      <h2>7. Complaints</h2>
      <p>If you are unhappy with our service, please use the complaint form on our <a href="/contact#complaint">Contact page</a> or email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>

      <h2>8. Governing law</h2>
      <p>These terms are governed by the laws of the Federal Republic of Nigeria, and the courts of the Federal Capital Territory, Abuja shall have jurisdiction.</p>

      <h2>9. Contact</h2>
      <p>{site.name} · {site.address.full} · {site.phone.display} · <a href={`mailto:${site.email}`}>{site.email}</a></p>
    </LegalPage>
  );
}
