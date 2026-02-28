import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : "standalone",
  basePath: isGitHubPages ? '/huyu-ai' : '',
  assetPrefix: isGitHubPages ? '/huyu-ai/' : '',
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    'cliff-election-supplements-households.trycloudflare.com',
    'registrar-duty-vacuum-brochures.trycloudflare.com',
  ],
};

export default nextConfig;
