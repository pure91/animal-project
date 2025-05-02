import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: 'standalone',
    images: {
        domains: ['175.45.203.119', 'localhost']
    },
};

export default nextConfig;
