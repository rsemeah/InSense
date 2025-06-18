/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile specific external packages so they work properly in Next.js
  transpilePackages: [
    '@supabase/supabase-js',
    '@supabase/auth-helpers-nextjs',
    'lucide-react',
    'openai',
    'stripe'
  ],

  // Disable type-checking and linting during production build for faster deploys
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Increase build output detail for debugging
  output: 'standalone',
  
  // Disable image optimization for simpler deployment
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
