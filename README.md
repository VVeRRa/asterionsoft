# Asterion Software

Web Asterion Software v Next.js 16. Vyžaduje Node.js 20.9 nebo novější.

```sh
npm ci
npm run dev
```

Lokální web běží na http://localhost:3000. Příkaz `npm run build` vytvoří statický export ve složce `out/`. Publikuje se obsah této složky včetně `_next/`. Pro náhled na vlastní doméně slouží přiložený `CNAME`; produkční doména se nastavuje u hostingu.

Texty karet služeb jsou v `app/services.json`, metadata v `app/layout.jsx` a veřejné soubory v `public/`. Poptávkový formulář hostuje Jotform.
