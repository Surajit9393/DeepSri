import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',   // Ensure this is set to 'export'
  trailingSlash: true, // Optional but helpful for static hosting
  images: {
    unoptimized: true, // Important for static export if using next/image
  },
}

export default nextConfig