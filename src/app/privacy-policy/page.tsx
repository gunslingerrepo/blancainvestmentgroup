import LegalPage from "@/components/LegalPage";
import SampleNotice from "@/components/SampleNotice";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Blanca Investment Limited collects, uses, stores and protects personal data submitted through this website.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="5 November 2026">
      <SampleNotice>This policy is a draft prepared for the website and should be reviewed by Blanca Investment Limited&apos;s legal adviser or Data Protection Officer before launch.</SampleNotice>

      <p>{site.name} (&quot;Blanca&quot;, &quot;we&quot;, &quot;us&quot;) respects your privacy. This policy explains what personal data we collect through this website, why we collect it, and your rights under the Nigeria Data Protection Act 2023 and related regulations.</p>

      <h2>1. Who we are</h2>
      <p>{site.name}, {site.address.full}, Nigeria. For any privacy question, contact us at <a href={`mailto:${site.email}`}>{site.email}</a> or {site.phone.display}.</p>

      <h2>2. Data we collect</h2>
      <ul>
        <li><strong>Quote requests:</strong> your name, email address, telephone number, the service you are interested in, your message, and service-specific details you choose to provide (for example system size, appliances, property interests, project type or location).</li>
        <li><strong>Complaints:</strong> your name, email address, telephone number, related service, subject, complaint details and any reference number you provide.</li>
        <li><strong>Direct contact:</strong> information you share when you call, email or message us on WhatsApp.</li>
        <li><strong>Technical data:</strong> limited information such as IP address, used temporarily to protect our forms from abuse, and standard server logs kept by our hosting provider.</li>
      </ul>

      <h2>3. How we use your data</h2>
      <ul>
        <li>To respond to your enquiry, prepare quotations and deliver the services you request.</li>
        <li>To investigate and resolve complaints and improve our services.</li>
        <li>To send you a confirmation of your submission.</li>
        <li>To keep records required for legal, accounting or regulatory purposes.</li>
      </ul>
      <p>Our lawful bases are your consent, steps taken at your request before entering into a contract, and our legitimate interest in running and improving our business. We do not sell your personal data, and we do not use it for marketing without your separate consent.</p>

      <h2>4. Sharing</h2>
      <p>We share personal data only with service providers that help us operate this website and our email (for example our hosting and email-delivery providers), with professional advisers where necessary, or where required by law. These providers may process data outside Nigeria; where they do, we rely on appropriate safeguards as required by law.</p>

      <h2>5. Retention</h2>
      <p>We keep enquiry and complaint records only as long as needed for the purposes above, typically up to 24 months after our last contact, or longer where a contract or the law requires it.</p>

      <h2>6. Security</h2>
      <p>This website uses encrypted (HTTPS) connections. Access to submissions is limited to authorised staff. No method of transmission or storage is completely secure, but we take reasonable steps to protect your data.</p>

      <h2>7. Your rights</h2>
      <p>You may request access to, correction of, or deletion of your personal data; object to or restrict its processing; withdraw consent at any time; and request a copy of your data. You may also lodge a complaint with the Nigeria Data Protection Commission. To exercise your rights, email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>

      <h2>8. Cookies and third-party services</h2>
      <p>This website does not use advertising or analytics cookies. The contact page embeds a Google Maps view, and the WhatsApp button links to WhatsApp; these services are governed by their own privacy policies. If analytics are added in future, this policy will be updated.</p>

      <h2>9. Changes</h2>
      <p>We may update this policy from time to time. The date at the top shows when it was last changed.</p>
    </LegalPage>
  );
}
