import type { ReactNode } from "react";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { RelatedTools } from "@/components/RelatedTools";
import { TrustBadges } from "@/components/TrustBadges";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/structuredData";

type ToolPageProps = {
  eyebrow?: string;
  title: string;
  description: string;
  path: string;
  children: ReactNode;
  faq?: { question: string; answer: string }[];
  toolId?: string;
};

export function ToolPage({
  eyebrow = "Image tool",
  title,
  description,
  path,
  children,
  faq,
  toolId,
}: ToolPageProps) {
  return (
    <main id="main" className="mx-auto w-full min-w-0 max-w-4xl flex-1 px-4 py-8 sm:px-6 sm:py-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Available tools", path: "/tools" },
          { name: title, path },
        ])}
      />
      {faq?.length ? <JsonLd data={faqPageJsonLd(faq)} /> : null}
      <p>
        <Link href="/tools" className="text-sm font-medium text-accent hover:underline">
          ← Available tools
        </Link>
      </p>
      <p className="mt-4 inline-flex rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
        {eyebrow}
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{description}</p>
      <TrustBadges />
      <div className="mt-8">{children}</div>
      <AdSlot slot="inline" className="mt-10" />
      {toolId ? <RelatedTools toolId={toolId} /> : null}
      {faq?.length ? (
        <section className="mt-16">
          <h2 className="mb-8 text-3xl font-semibold tracking-tight text-ink">FAQ</h2>
          <FAQ items={faq} />
        </section>
      ) : null}
    </main>
  );
}
