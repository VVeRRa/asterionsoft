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

The owner e-mail carries contact details, category, urgency and the Supabase ID, not the inquiry text; the text is read in Supabase (the e-mail links to the table editor). Only when storing in Supabase fails does the e-mail carry the full text, so nothing gets lost. The auto-reply does not repeat the customer's message. Logs contain status and error codes only, never e-mail addresses or inquiry content.

Server functions run in Dublin (`dub1` in `vercel.json`), next to the Supabase project (`eu-west-1`).

Secrets live only in environment variables; see `.env.example`. Copy it to `.env.local` for local development and set the same variables in Vercel for production. Service values are stored in Czech (`formValue` in `app/services.json`) regardless of the site language.

## Legal pages and privacy

The privacy policy and terms of business live in `app/legal/` (Czech, English, German) and are served at `/ochrana-osobnich-udaju/`, `/obchodni-podminky/`, `/en/privacy/`, `/en/terms/`, `/de/datenschutz/` and `/de/agb/`. When a text changes, update `legalEffectiveDate` in `app/legal/paths.ts`; older versions stay in git history.

The policy describes what the code does, so keep them in sync. A new third party (analytics, video, chat, another processor) needs an entry in `app/legal/privacy.ts` and in the Content Security Policy in `next.config.ts` before it ships. The CSP runs in `Report-Only` mode until a production build on a preview shows no violations; then rename the header to `Content-Security-Policy`.

## Data retention

`supabase/migrations/20261124000000_inquiry_retention.sql` adds `last_contact_at` and `engagement_ended_at` and the function `public.purge_inquiries()`, which deletes spam after 30 days, clears IP hashes and user agents after 30 days, deletes inquiries without a project 12 months after the last contact, and won inquiries 4 years after the engagement ended. Deploy it in this order:

1. Run the migration. Nothing is scheduled yet.
2. Where the conversation went on by e-mail, set `last_contact_at` to the last real contact. For finished projects, fill `engagement_ended_at`.
3. Run the preview query from the migration in the SQL editor and check what would be deleted.
4. Enable `pg_cron` and schedule the job (the commented-out lines at the end of the migration).

Day to day: after every reply or call, update `last_contact_at`; when a project ends, fill `engagement_ended_at`. Copies outside the database (the notification mailbox, Resend history) follow the same periods and are cleaned up by hand.

