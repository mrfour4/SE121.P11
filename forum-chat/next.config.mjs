/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "loyal-lobster-184.convex.cloud",
                pathname: "/api/storage/**",
            },
            {
                protocol: "https",
                hostname: "good-cricket-565.convex.cloud",
                pathname: "/api/storage/**",
            },
        ],
    },
};

export default nextConfig;
