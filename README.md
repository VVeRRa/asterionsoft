# Asterion Software

A multilingual Next.js 16 website for Asterion Software. Requires Node.js 20.9 or later.

## Local development

```sh
git clone https://github.com/VVeRRa/asterionsoft.git
cd asterionsoft
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build and deploy

Run `npm run build` to generate the static site in `out/`. Publish the entire contents, including `_next/`. Configure the production domain with your hosting provider. The export includes the project's `CNAME`.

## Content and translations

Czech is served at `/`, English at `/en/`, and German at `/de/`. Website copy and service card translations live in `app/messages/`. Metadata is defined in `app/metadata.js`, and public assets live in `public/`.

Jotform hosts the enquiry form. Add English and German field translations in the Jotform editor. The site passes the selected language via the `language` parameter. The values sent in the `sluzba` field remain in Czech to match the existing form.
