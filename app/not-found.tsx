import Link from "next/link";
import { routes } from "@/config/site";

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
        That URL is not part of this site yet. The image converter is ready; other tools are still
        on the way.
      </p>
      <p className="mt-8">
        <Link href={routes.home} className="btn-primary">
          Back to home
        </Link>
      </p>
    </main>
  );
}
