/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for highlighting potential problems
  reactStrictMode: true,

  // Generate a standalone output (useful for Docker/Vercel advanced deployments)
  output: 'standalone',

  // Redirect any old `/app/*` routes to their new locations
  async redirects() {
    return [
      {
        source: '/app/:path*',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
