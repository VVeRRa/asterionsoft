import type { NextConfig } from "next";

// Pages are still prerendered statically; without `output: "export"`, though, Vercel
// can also run the server API route for the inquiry form.
const config: NextConfig = { trailingSlash: true };

export default config;
