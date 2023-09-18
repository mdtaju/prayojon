/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: [process.env.NEXT_PUBLIC_SERVER_URL],
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_SERVER_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_SERVER_HOSTNAME,
        port: process.env.NEXT_PUBLIC_SERVER_PORT,
        // pathname: '/account123/**',
      },
    ],
  },
};

module.exports = nextConfig;
