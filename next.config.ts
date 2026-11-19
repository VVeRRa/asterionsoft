import type { NextConfig } from "next";

// Stránky se dál předgenerují staticky; bez `output: "export"` ale Vercel
// může spustit i serverovou API route pro poptávkový formulář.
const config: NextConfig = { trailingSlash: true };

export default config;
