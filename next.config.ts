// next.config.js
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },

  async redirects() {
    return [
      { source: '/contact', destination: '/contact/home', permanent: true },
      { source: '/contact/', destination: '/contact/home', permanent: true },
    ];
  },
};

module.exports = nextConfig;
