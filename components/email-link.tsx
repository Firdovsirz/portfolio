"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { site } from "@/lib/site";

const noopSubscribe = () => () => {};

/** False during SSR and the hydration pass, true afterwards. */
function useIsHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/**
 * Renders the contact address without ever putting it in the HTML source.
 * The server output carries an obfuscated form ("name [at] example [dot] com");
 * the real `mailto:` link is assembled in the browser after hydration, which
 * keeps the address usable for people and useless to address-harvesting
 * crawlers that only read the served markup.
 */
export function EmailLink({
  className = "",
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const hydrated = useIsHydrated();

  if (!hydrated) {
    return (
      <span className={className} aria-label="Email address">
        {children ?? site.emailObfuscated}
      </span>
    );
  }

  const address = `${site.emailUser}@${site.emailDomain}`;

  return (
    <a href={`mailto:${address}`} className={className} aria-label="Email Firdovsi Rzaev">
      {children ?? address}
    </a>
  );
}
