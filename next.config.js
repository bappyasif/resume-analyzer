/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    serverExternalPackages: ["pdf-parse"],
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        // ignoreDuringBuilds: true,

        // Ignore only when deploying on Vercel with NEXT_IGNORE_ESLINT set
        ignoreDuringBuilds: process.env.NEXT_IGNORE_ESLINT === 'true',
    },
};

export default config;
