# Asterion Software

A multilingual Next.js 16 website for Asterion Software. Requires Node.js 20.9 or later.

## Local development

```sh
git clone https://github.com/VVeRRa/asterionsoft.git
cd asterionsoft
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The project uses TypeScript in strict mode; run `npm run typecheck` to check types.

## Build and deploy

The site is deployed on Vercel. Pages are prerendered statically; the enquiry form posts to the server route `app/api/inquiry/route.ts`, so the project is no longer a pure static export. Run `npm run build` to check a production build locally.

## Content and translations

Czech is served at `/`, English at `/en/`, and German at `/de/`. Website copy and service card translations live in `app/messages/`. Metadata is defined in `app/metadata.ts`, and public assets live in `public/`.

## Enquiry form

The form (`app/inquiry-form.tsx`) is translated through `form` in `app/messages/`. Submissions go to `POST /api/inquiry/`, which:

1. rejects bots (hidden honeypot field, minimum fill time, optional Cloudflare Turnstile) and limits each IP to 5 enquiries per hour;
2. classifies the enquiry (service category, urgency, Czech summary, next step, spam flag) with Claude when `ANTHROPIC_API_KEY` is set, otherwise with keyword rules;
3. stores it in the Supabase table `inquiries` (`supabase/migrations/`);
4. emails the owner via Resend (reply goes straight to the customer) and sends the customer an auto-reply in the language they used.

Secrets live only in environment variables; see `.env.example`. Copy it to `.env.local` for local development and set the same variables in Vercel for production. Service values are stored in Czech (`formValue` in `app/services.json`) regardless of the site language.
