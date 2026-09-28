import type { ReactNode } from "react";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Do Not Sell or Share My Personal Information",
  description:
    "California privacy choices for Image Reshaper, including how to opt out of sale or sharing of personal information used for advertising.",
  path: "/do-not-sell",
});

function ChoiceCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function DoNotSellPage() {
  return (
    <main id="main" className="prose-page mx-auto w-full flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">
        Do Not Sell or Share My Personal Information
      </h1>
      <p className="mt-4 text-sm text-muted">California Consumer Privacy Act (CCPA / CPRA)</p>
      <p>
        Image Reshaper does not sell personal information for money. When analytics or advertising
        is enabled, we and Google may process identifiers (such as cookie IDs and IP-derived data)
        that California law can treat as a &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; for
        cross-context behavioral advertising. This page explains how to opt out.
      </p>

      <ChoiceCard title="Opt out with Google">
        <p>
          Use Google&apos;s ad settings to control personalized ads across sites that use Google
          advertising services:
        </p>
        <p>
          <a
            href="https://adssettings.google.com/"
            rel="noopener noreferrer"
            target="_blank"
            className="font-medium text-accent"
          >
            adssettings.google.com
          </a>
        </p>
        <p>
          You can also visit the industry opt-out tools at{" "}
          <a
            href="https://optout.aboutads.info/"
            rel="noopener noreferrer"
            target="_blank"
          >
            optout.aboutads.info
          </a>
          .
        </p>
      </ChoiceCard>

      <ChoiceCard title="Global Privacy Control (GPC)">
        <p>
          If your browser sends a Global Privacy Control signal, we treat it as a request to deny
          ad storage, ad user data, and ad personalization under Google Consent Mode. We also keep
          ads data redaction enabled. Enable GPC in a supporting browser or extension if you want
          that signal sent automatically.
        </p>
      </ChoiceCard>

      <ChoiceCard title="Cookie settings">
        <p>
          Visitors in the EEA, UK, and Switzerland may also see Google&apos;s consent message. When
          available, use &ldquo;Cookie settings&rdquo; in the site footer to change those choices.
          Elsewhere, use your browser controls and the Google links above.
        </p>
      </ChoiceCard>

      <ChoiceCard title="What we do not collect for ads">
        <p>
          Image files you process in the tools are not uploaded to Image Reshaper and are not sent
          to advertising providers. Opting out affects advertising and related identifiers, not the
          local image tools themselves.
        </p>
      </ChoiceCard>

      <p className="mt-12">
        More detail is in the <Link href="/privacy">Privacy Policy</Link>. Questions: see{" "}
        <Link href="/contact">Contact</Link>.
      </p>
    </main>
  );
}
