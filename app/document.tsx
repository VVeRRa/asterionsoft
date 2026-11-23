import type { ReactNode } from "react";
import type { Locale } from "./locales";
// Inter is bundled and served from our own domain, so visitors never connect to Google Fonts
// (the privacy policy says so in the cookies section).
import "@fontsource-variable/inter";
import "./globals.css";

type DocumentProps = { locale: Locale; children: ReactNode };

export default function Document({ locale, children }: DocumentProps) {
  return (
    <html lang={locale}>
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
