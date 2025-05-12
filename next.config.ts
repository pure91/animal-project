import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'zootypes.com',
                port: '', // 443은 생략 가능
                pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'www.zootypes.com',
                port: '',
                pathname: '/images/**',
            },
        ],
    },
};

export default nextConfig;
