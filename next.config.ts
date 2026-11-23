import type { NextConfig } from "next";

/*
 * Content Security Policy: the site may load scripts, styles, fonts and images only from itself, plus
 * Cloudflare Turnstile for the enquiry form. It runs in Report-Only mode first: violations are only
 * reported in the browser console. Once a production build on a preview shows no violations (language
 * switch, legal pages, the whole form including Turnstile and error states), rename the header to
 * Content-Security-Policy to enforce it. 'unsafe-inline' for scripts is needed by Next.js inline
 * scripts and the JSON-LD block; it can be replaced with nonces later.
 * Any new third party (analytics, video, chat) must be added here and to app/legal/privacy.ts.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data:",
  "frame-src https://challenges.cloudflare.com",
  "connect-src 'self' https://challenges.cloudflare.com",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

// Pages are still prerendered statically; without `output: "export"`, though, Vercel
// can also run the server API route for the inquiry form.
const config: NextConfig = {
  trailingSlash: true,
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "Content-Security-Policy-Report-Only", value: contentSecurityPolicy }] }];
  },
};

export default config;
