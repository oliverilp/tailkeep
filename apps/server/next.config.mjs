/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: ''
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    serverComponentsExternalPackages: ['@node-rs/argon2', 'bullmq']
  },
  output: 'standalone'
};

export default nextConfig;
