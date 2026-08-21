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
          For project questions, email <a href={`mailto:${email}`}>{email}</a>.
        </p>
      ) : (
        <p>
          A public contact address has not been configured yet. Set{" "}
          <code className="font-mono text-ink">NEXT_PUBLIC_CONTACT_EMAIL</code> when you deploy if
          you want this page to show a mailbox.
        </p>
      )}
    </main>
  );
}
