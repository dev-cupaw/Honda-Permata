/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ensure ESLint runs during builds (this is the default behavior)
    ignoreDuringBuilds: false,
  },
  typescript: {
    // TypeScript errors will now be checked during build
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
