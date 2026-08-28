import { env } from "@/config/env";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How ImageReshaper handles images, analytics, advertising, cookies, and contact: processing stays in your browser, and image files are not uploaded to our servers.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const email = env.contactEmail;

  return (
    <main id="main" className="prose-page mx-auto w-full flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">Privacy Policy</h1>
      <p className="mt-4 text-sm text-muted">Last updated: 27 August 2026</p>

      <h2>How We Handle Your Images</h2>
      <p>
        ImageReshaper processes your images directly in your web browser. Your image files are not
        uploaded to or stored on our servers.
      </p>
      <p>
        When you select an image, it remains in your browser while the tool processes it. The
        resulting file is created locally and can be downloaded to your device. Refreshing or
        closing the page removes the processed data from the browser session.
      </p>

      <h2>Information We Do Not Collect</h2>
      <p>ImageReshaper does not collect or store:</p>
      <ul>
        <li>Image contents or pixels</li>
        <li>Image filenames</li>
        <li>EXIF or other image metadata</li>
        <li>User accounts or profiles</li>
      </ul>

      <h2>Analytics</h2>
      <p>
        We use analytics services to understand how visitors use ImageReshaper and to improve the
        website.
      </p>
      <p>Analytics may collect information such as:</p>
      <ul>
        <li>Pages visited</li>
        <li>Tools used</li>
        <li>General device and browser information</li>
        <li>Approximate location</li>
        <li>Referring website</li>
        <li>Interaction and usage events</li>
      </ul>
      <p>Analytics does not receive your image files, image pixels, or image contents.</p>

      <h2>Advertising</h2>
      <p>
        ImageReshaper may display advertisements from third-party advertising providers. These
        providers may use cookies or similar technologies to deliver, measure, and personalize
        advertisements.
      </p>
      <p>
        Depending on your location and applicable privacy requirements, you may be asked for consent
        before certain cookies or personalized advertising technologies are used.
      </p>
      <p>
        Advertising providers do not receive your uploaded image files or image contents from
        ImageReshaper.
      </p>

      <h2>Cookies and Similar Technologies</h2>
      <p>ImageReshaper and its third-party service providers may use cookies and similar technologies for:</p>
      <ul>
        <li>Website functionality</li>
        <li>Analytics</li>
        <li>Advertising</li>
        <li>Security</li>
        <li>Measuring website performance</li>
      </ul>
      <p>
        You can manage or restrict cookies through your browser settings and, where applicable, our
        cookie-consent controls.
      </p>

      <h2>Hosting and Server Logs</h2>
      <p>
        Our hosting provider may collect standard technical information, such as IP address,
        requested URLs, browser information, and timestamps, as part of normal website operation,
        security, and reliability.
      </p>
      <p>
        Because image processing takes place in your browser, your images are not uploaded to our
        servers or included in our server logs.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        We may use third-party services for analytics, advertising, hosting, security, and website
        performance.
      </p>
      <p>
        These providers may process information according to their own privacy policies. We
        recommend reviewing the privacy policies of third-party services used on the website.
      </p>

      <h2>Data Security</h2>
      <p>
        We take reasonable measures to protect the website and user information. However, no
        internet service can guarantee absolute security.
      </p>
      <p>
        Since image processing occurs locally in your browser and images are not uploaded to our
        servers, ImageReshaper does not maintain a server-side copy of your uploaded images.
      </p>

      <h2>Your Privacy Choices</h2>
      <p>
        Depending on your location, you may have rights regarding your personal information,
        including the right to:
      </p>
      <ul>
        <li>Request access to personal information</li>
        <li>Request correction or deletion</li>
        <li>Withdraw consent where processing is based on consent</li>
        <li>Object to certain processing</li>
        <li>Manage cookie and advertising preferences</li>
      </ul>
      <p>You can also control cookies through your browser settings.</p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy when our services, analytics, advertising, or legal
        requirements change. The Last updated date at the top of this page indicates when the policy
        was most recently revised.
      </p>

      <h2>Contact</h2>
      <p>
        If you have questions about this Privacy Policy or our privacy practices, please contact us
        at {email ? <a href={`mailto:${email}`}>{email}</a> : "the contact page"}.
      </p>
    </main>
  );
}
