import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t hairline mt-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10 py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="serif text-2xl tracking-tight">Firdovsi Rzaev</p>
            <p className="text-muted text-sm mt-2 max-w-md">
              Software Engineer building production institutional systems. Applying for funded MSc / MASc
              programmes in Canada and Europe, 2027 intake.
            </p>
          </div>

          <div className="flex flex-col gap-1 text-sm text-muted md:items-end">
            <a href={site.social.email} className="link-underline hover:text-foreground">
              {site.email}
            </a>
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline hover:text-foreground"
            >
              GitHub ↗
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline hover:text-foreground"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t hairline flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-muted-2 mono">
          <span>© {new Date().getFullYear()} Firdovsi Rzaev. All rights reserved.</span>
          <Link href="/contact" className="hover:text-foreground">
            Get in touch →
          </Link>
        </div>
      </div>
    </footer>
  );
}
