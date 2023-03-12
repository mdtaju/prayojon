/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    NEXTAUTH_URL: 'https://prayojon.vercel.app',
    NEXTAUTH_SECRET: '9/t9OgEaK+FH5pLc4zh3+pn6Iz76t1R7dZvzuk0/1HA=',
    GOOGLE_CLIENT_ID: "34076138076-241viq138prertak9h48lu0jmqhaktd2.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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"
  },
}

module.exports = nextConfig
