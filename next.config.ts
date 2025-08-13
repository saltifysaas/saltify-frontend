// next.config.ts
import path from 'path';
import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig } from 'webpack';

const nextConfig: NextConfig = {
  webpack(config: WebpackConfig, _context: any) {
    // Ensure alias object exists, then set '@' → 'src'
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },

  async redirects() {
    return [
      { source: '/contact', destination: '/contact/home', permanent: true },
      { source: '/contact/', destination: '/contact/home', permanent: true },
    ];
  },
};

export default nextConfig;
