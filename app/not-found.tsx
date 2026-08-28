import Link from "next/link";
import { routes } from "@/config/site";

export const metadata = {
  title: "Page not found",
  description: "That URL is not part of Image Reshaper.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-20 sm:px-6"
    >
      <p className="inline-flex rounded-full bg-paper px-3 py-1 text-sm font-medium text-muted">
        404
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">Page not found</h1>
      <p className="mt-4 max-w-lg text-muted">
        That address is not a tool on this site. Open the converter, the full tool list, or go back
        home.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={routes.home} className="btn-primary">
          Back to home
        </Link>
        <Link href="/tools" className="btn-secondary">
          Available tools
        </Link>
      </div>
    </main>
  );
}
