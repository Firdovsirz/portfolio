import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

type Partner = {
  name: string;
  shortName: string;
  logoBase: string; // file name w/o extension, looked up under /public/logos
  href: string;
};

const partners: Partner[] = [
  {
    name: "Dithari Innovation and Training Centre",
    shortName: "Dithari",
    logoBase: "dithari",
    href: "https://dithari.com",
  },
  {
    name: "Buyology Trading FZ-LLC",
    shortName: "Buyology",
    logoBase: "buyology",
    href: "https://web.buyology.online",
  },
  {
    name: "Azerbaijan Technical University",
    shortName: "AzTU",
    logoBase: "aztu",
    href: "https://aztu.edu.az",
  },
];

const exts = ["svg", "avif", "webp", "png", "jpg", "jpeg"] as const;

function findLogo(base: string): string | null {
  for (const ext of exts) {
    const rel = `logos/${base}.${ext}`;
    const abs = path.join(process.cwd(), "public", rel);
    if (fs.existsSync(abs)) return "/" + rel;
  }
  return null;
}

export function TrustedBy() {
  const resolved = partners.map((p) => ({ ...p, logo: findLogo(p.logoBase) }));

  return (
    <section
      aria-labelledby="trusted-by-heading"
      className="border-y hairline"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10 py-14 md:py-16">
        <h2
          id="trusted-by-heading"
          className="mono text-xs text-muted-2 uppercase tracking-widest text-center mb-10"
        >
          Trusted by
        </h2>

        <ul className="grid grid-cols-3 gap-6 md:gap-10 items-center justify-items-center">
          {resolved.map((p) => (
            <li key={p.shortName} className="w-full flex items-center justify-center">
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                title={`${p.name} — opens in new tab`}
                aria-label={`Visit ${p.name}`}
                className="group flex items-center justify-center w-full h-20 md:h-28 outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] rounded-sm transition-transform hover:scale-[1.03]"
              >
                {p.logo ? (
                  <Image
                    src={p.logo}
                    alt={p.name}
                    width={260}
                    height={112}
                    sizes="(min-width: 768px) 260px, 33vw"
                    className="max-h-16 md:max-h-24 w-auto object-contain"
                  />
                ) : (
                  <span className="serif text-2xl md:text-4xl tracking-tight text-foreground">
                    {p.shortName}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
