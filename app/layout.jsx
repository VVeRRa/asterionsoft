import "./globals.css";

export const metadata = {
  "title": "Asterion Software — AI, automatizace a vývoj aplikací na míru",
  "description": "Asterion Software, s.r.o. — AI audit, automatizace firemních procesů, interní AI asistenti, webové aplikace na míru, Java/Spring konzultace a firemní školení AI.",
  "alternates": {
    "canonical": "https://asterionsoft.cz/"
  },
  "robots": {
    "index": true,
    "follow": true
  },
  "openGraph": {
    "type": "website",
    "siteName": "Asterion Software",
    "title": "Asterion Software — AI, automatizace a vývoj aplikací",
    "description": "Seniorní vývoj, praktická AI a automatizace pro firmy. Od auditu a školení po aplikaci v produkci.",
    "url": "https://asterionsoft.cz/",
    "locale": "cs_CZ",
    "images": [
      {
        "url": "https://asterionsoft.cz/og-image.png",
        "width": 1200,
        "height": 630,
        "alt": "Asterion Software — AI, automatizace a vývoj aplikací pro firmy"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Asterion Software — AI, automatizace a vývoj aplikací",
    "description": "Seniorní vývoj, praktická AI a automatizace pro firmy.",
    "images": [
      "https://asterionsoft.cz/og-image.png"
    ]
  },
  "icons": {
    "icon": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%237c3aed'/%3E%3Cstop offset='1' stop-color='%233b82f6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='14' fill='url(%23g)'/%3E%3Ctext x='32' y='45' font-family='Arial, sans-serif' font-size='38' font-weight='800' fill='white' text-anchor='middle'%3EA%3C/text%3E%3C/svg%3E"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
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
