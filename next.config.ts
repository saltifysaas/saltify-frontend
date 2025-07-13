/** @type {import('next').NextConfig} */
const nextConfig = {
  // This disables Turbopack, forces classic Webpack
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
