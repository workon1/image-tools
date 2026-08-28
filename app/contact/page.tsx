import { env } from "@/config/env";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "How to get in touch about this image conversion tool.",
  path: "/contact",
});

export default function ContactPage() {
  const email = env.contactEmail;

  return (
    <main id="main" className="prose-page mx-auto w-full flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">Contact</h1>
      <p>
        This converter runs in your browser and does not require an account. There is no in-app
        support inbox for uploaded files, because files are never sent to a server.
      </p>
      {email ? (
        <p>
          For any questions or inquiries, please email us at{" "}
          <a href={`mailto:${email}`}>{email}</a>. This email is associated with the ImageReshaper
          domain.
        </p>
      ) : (
        <p>
          For project questions, use the email listed in the site footer once a public mailbox is
          published.
        </p>
      )}
    </main>
  );
}
