/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // transpilePackages: ['@tailkeep/ui'],
  images: {
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
  output: 'standalone'
};

export default nextConfig;
