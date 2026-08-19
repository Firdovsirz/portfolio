import Script from "next/script";

/**
 * Privacy-first analytics, switched on entirely by environment variables so
 * the site ships without a tracker unless one is configured:
 *
 *   NEXT_PUBLIC_PLAUSIBLE_DOMAIN  e.g. firdovsirzaev.online
 *   NEXT_PUBLIC_PLAUSIBLE_SRC     optional self-hosted script URL
 *   NEXT_PUBLIC_GA_ID             e.g. G-XXXXXXXXXX
 *
 * Both load after hydration, so neither blocks first paint.
 */
const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const plausibleSrc =
  process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ?? "https://plausible.io/js/script.js";
const gaId = process.env.NEXT_PUBLIC_GA_ID;

export function Analytics() {
  return (
    <>
      {plausibleDomain && (
        <Script
          id="plausible"
          src={plausibleSrc}
          data-domain={plausibleDomain}
          strategy="afterInteractive"
          defer
        />
      )}

      {gaId && (
        <>
          <Script
            id="ga-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
    </>
  );
}
