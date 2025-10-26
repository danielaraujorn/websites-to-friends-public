import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "@/app/globals.css";
import * as webConfig from "@/app/website-config";
import {
  headingNowRegular,
  headingNowBold,
} from "@/app/fonts";

export async function generateStaticParams() {
  if (process.env.ENABLE_MULTI_LANGUAGE === "true") {
    const supportedLangs = (
      webConfig as typeof webConfig & {
        supportedLangs?: string[];
      }
    ).supportedLangs ?? ["pt-BR"];
    return supportedLangs.map((lang: string) => ({
      lang,
    }));
  }
  return [];
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const isProd = process.env.VERCEL_ENV === "production";

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_FRONTEND_URL
    ? new URL(process.env.NEXT_PUBLIC_FRONTEND_URL)
    : undefined,
  title: {
    default: "",
    template: "%s",
  },
  description: "",
  robots: isProd
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang?: string }>;
}>) {
  const { lang = "pt-BR" } = await params;

  return (
    <html lang={lang}>
      <head>
        {/* Preconnect to Contentful assets for faster image loads */}
        <link
          rel="preconnect"
          href="https://images.ctfassets.net"
        />
        <link
          rel="dns-prefetch"
          href="https://images.ctfassets.net"
        />
        {/* Google Tag Manager */}
        {!!process.env.NEXT_PUBLIC_GTM && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM}');`,
            }}
          />
        )}

        {/* Google Analytics */}
        {!!process.env.NEXT_PUBLIC_GTAG && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG}`}
            />
            <Script
              id="gtag-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GTAG}');`,
              }}
            />
          </>
        )}
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${headingNowRegular.variable} ${headingNowBold.variable}`}
      >
        {/* Google Tag Manager */}
        {!!process.env.NEXT_PUBLIC_GTM && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM}`}
              height="0"
              width="0"
              style={{
                display: "none",
                visibility: "hidden",
              }}
            ></iframe>
          </noscript>
        )}

        {children}
        <Analytics />
      </body>
    </html>
  );
}
