import type { ReactNode } from "react";
import type { Locale } from "./locales";
import "./globals.css";

type DocumentProps = { locale: Locale; children: ReactNode };

export default function Document({ locale, children }: DocumentProps) {
  return (
    <html lang={locale}>
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
