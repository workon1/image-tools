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
      <p className="mt-4 text-sm text-muted">Last updated: 28 September 2026</p>

      <h2>Who operates this site</h2>
      <p>
        ImageReshaper is operated as a free browser-based image utility at {env.siteUrl}. For privacy
        questions, email {email ? <a href={`mailto:${email}`}>{email}</a> : "us via the contact page"}.
        We do not require accounts. There is no separate user profile database.
      </p>

      <h2>How We Handle Your Images</h2>
      <p>
        ImageReshaper processes your images directly in your web browser. Your image files are not
        uploaded to or stored on our servers for conversion, compression, cropping, rotation, or
        related tools.
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
        <li>EXIF or other image metadata from the files you process</li>
        <li>User accounts or profiles</li>
      </ul>

      <h2>Analytics</h2>
      <p>
        When analytics is enabled, we use Google Analytics 4 to understand how visitors use
        ImageReshaper and to improve the website. Measurement is configured with Google Consent Mode
        so advertising and analytics storage defaults to denied in the European Economic Area, the
        United Kingdom, and Switzerland until a consent choice updates those settings.
      </p>
      <p>Analytics may collect information such as:</p>
      <ul>
        <li>Pages visited</li>
        <li>Tools used</li>
        <li>General device and browser information</li>
        <li>Approximate location derived from IP address</li>
        <li>Referring website</li>
        <li>Interaction and usage events</li>
      </ul>
      <p>
        Analytics does not receive your image files, image pixels, or image contents. Loading the
        analytics script still involves a network request to Google, which is separate from image
        processing. See{" "}
        <a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">
          Google&apos;s Privacy Policy
        </a>
        .
      </p>

      <h2>Advertising</h2>
      <p>
        ImageReshaper may display advertisements from Google AdSense once the site is approved and
        advertising is enabled. Until display ads are enabled, we may still load the AdSense script
        so Google&apos;s consent message can run for analytics, while ad requests stay paused. When
        ads are active, Google and its partners may use cookies or similar technologies to deliver,
        measure, and (where allowed) personalize advertisements.
      </p>
      <p>
        Depending on your location and applicable privacy requirements, you may be asked for consent
        before certain advertising cookies or personalization technologies are used.
      </p>
      <p>
        Advertising providers do not receive your selected image files or image contents from
        ImageReshaper.
      </p>

      <h2>Cookies and Similar Technologies</h2>
      <p>ImageReshaper and its third-party service providers may use cookies and similar technologies for:</p>
      <ul>
        <li>Website functionality</li>
        <li>Analytics (Google Analytics 4, when enabled)</li>
        <li>Advertising (Google AdSense, when enabled)</li>
        <li>Security and measuring website performance</li>
      </ul>
      <p>
        In the European Economic Area, the United Kingdom, and Switzerland we apply Google Consent
        Mode defaults that deny analytics and advertising storage until consent is updated. We load
        Google&apos;s AdSense script so its certified consent message (Funding Choices) can appear
        for those visitors even while display ads are paused. When that message is available, a
        &ldquo;Cookie settings&rdquo; control appears in the footer so you can change those choices.
        If that control is not shown, manage or restrict cookies through your browser settings.
        Outside those regions, browser settings and the{" "}
        <a href="/do-not-sell">Do Not Sell or Share</a> page remain the primary controls.
      </p>

      <h2>Hosting and Server Logs</h2>
      <p>
        The site is hosted on Vercel. The hosting provider may collect standard technical
        information, such as IP address, requested URLs, browser information, and timestamps, as
        part of normal website operation, security, and reliability.
      </p>
      <p>
        Because image processing takes place in your browser, your images are not uploaded to our
        servers or included in our server logs.
      </p>

      <h2>Contact email</h2>
      <p>
        If you email {email ? <a href={`mailto:${email}`}>{email}</a> : "us"}, we receive the
        message contents, your email address, and any attachments you choose to send. We use that
        information only to respond to your inquiry and keep it only as long as needed for that
        purpose. Prefer not to attach identity documents or photos you would not want retained in
        an inbox.
      </p>

      <h2>Third-Party Services</h2>
      <p>Depending on configuration, we may use:</p>
      <ul>
        <li>Google Analytics 4 for usage measurement</li>
        <li>Google AdSense for advertisements (when enabled)</li>
        <li>Vercel for hosting and delivery</li>
      </ul>
      <p>
        These providers process information according to their own privacy policies. We recommend
        reviewing those policies for details on retention, transfers, and your choices.
      </p>

      <h2>International transfers</h2>
      <p>
        Google and Vercel may process data in the United States and other countries. Where required,
        those transfers rely on the providers&apos; published transfer mechanisms and terms.
      </p>

      <h2>Data Security</h2>
      <p>
        We take reasonable measures to protect the website and user information. However, no
        internet service can guarantee absolute security.
      </p>
      <p>
        Since image processing occurs locally in your browser and images are not uploaded to our
        servers for tool use, ImageReshaper does not maintain a server-side copy of the images you
        process in the tools.
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
        <li>Manage cookie and advertising preferences where a consent message is available</li>
      </ul>
      <p>You can also control cookies through your browser settings.</p>

      <h2>California privacy choices (CCPA / CPRA)</h2>
      <p>
        We do not sell personal information for money. Analytics and advertising partners such as
        Google may process identifiers in ways California law treats as a &ldquo;sale&rdquo; or
        &ldquo;sharing&rdquo; for cross-context behavioral advertising. California residents can
        opt out on our{" "}
        <a href="/do-not-sell">Do Not Sell or Share My Personal Information</a> page. We also honor
        Global Privacy Control (GPC) signals by denying ad storage, ad user data, and ad
        personalization under Consent Mode.
      </p>

      <h2>Children</h2>
      <p>
        ImageReshaper does not offer accounts, social features, or content directed at children
        under 13. We do not knowingly collect personal information from children. If you believe a
        child has sent us personal information by email, contact us and we will delete it.
      </p>

      <h2>Open-source components</h2>
      <p>
        Some tools load open-source libraries in your browser (for example, an HEIC decoder under
        LGPL-3.0). Those libraries run locally to transform files you select; they are not used to
        upload your images to ImageReshaper. See the{" "}
        <a href="/licenses">third-party licenses</a> page for notices and source links.
      </p>

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
