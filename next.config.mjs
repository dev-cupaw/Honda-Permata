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
    unoptimized: false, // Enable image optimization
    formats: ['image/webp', 'image/avif'], // Modern image formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Responsive device sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Image sizes for different use cases
    
    // Security configuration for SVG handling
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    // Fallback configuration
    loader: 'default',
  },
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // Webpack optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Client-side optimizations
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  }
}

export default nextConfig
