import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

const nextConfig: NextConfig = {
  webpack: (config: Configuration) => {
    // Customize webpack here if needed
    return config;
  },
};

export default nextConfig;
