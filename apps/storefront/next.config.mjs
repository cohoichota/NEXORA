/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile workspace packages
  transpilePackages: ['@nexora/ui', '@nexora/shared-types', '@nexora/shared-utils'],

  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '9000' }, // MinIO local
      { protocol: 'https', hostname: '**.amazonaws.com' }, // S3
      { protocol: 'https', hostname: 'images.unsplash.com' }, // Placeholder images
    ],
  },

  experimental: {
    // Enable server actions
    serverActions: { allowedOrigins: ['localhost:3000'] },
  },
};

export default nextConfig;
