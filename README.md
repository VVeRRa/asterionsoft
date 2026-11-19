# Asterion Software

Web Asterion Software v Next.js 16. Vyžaduje Node.js 20.9 nebo novější.

```sh
git clone https://github.com/VVeRRa/asterionsoft.git
cd asterionsoft
npm ci
npm run dev
```

Lokální web běží na http://localhost:3000. Příkaz `npm run build` vytvoří statický export ve složce `out/`. Publikuje se obsah této složky včetně `_next/`. Pro náhled na vlastní doméně slouží přiložený `CNAME`; produkční doména se nastavuje u hostingu.

Čeština je na `/`, angličtina na `/en/` a němčina na `/de/`. Překlady webu a karet služeb jsou v `app/messages/`. Společná metadata jsou v `app/metadata.js` a veřejné soubory v `public/`.

Poptávkový formulář hostuje Jotform. Pro zobrazení jeho polí v angličtině a němčině přidejte překlady v editoru Jotformu. Web už předává požadovaný jazyk parametrem `language`. Hodnoty pole `sluzba` zůstávají česky, aby odpovídaly stávajícímu formuláři.
