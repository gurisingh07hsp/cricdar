import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    // images: {
    //     remotePatterns: [
    //         {
    //             protocol: 'https',
    //             hostname: 'firebasestorage.googleapis.com',
    //             port: '',
    //             pathname: '/v0/b/**', // Allow all subpaths under /v0/b/
    //         },
    //     ],
    // },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors. This is strongly discouraged.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    eslint: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has ESLint errors.
        // !! WARN !!
        ignoreDuringBuilds: true, // Ignores ESLint errors during build
    },
};

export default nextConfig;
