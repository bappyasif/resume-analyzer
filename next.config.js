/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    experimental: {
        serverComponentsExternalPackages: ["pdf-parse"],
    },
    // webpack(config, { isServer }) {
    //     if (!isServer) {
    //         config.resolve.fallback = {
    //             ...(config.resolve.fallback || {}),
    //             fs: false,
    //             path: false,
    //             crypto: false,
    //         };
    //     }
    //     return config;
    // },
    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
        };
        return config;
    },
};

export default config;
