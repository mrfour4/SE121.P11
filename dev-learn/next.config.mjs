/** @type {import('next').NextConfig} */

import { withNextVideo } from "next-video/process";

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io",
                port: "",
                pathname: "/f/**",
            },
        ],
    },
};

export default withNextVideo(nextConfig);
