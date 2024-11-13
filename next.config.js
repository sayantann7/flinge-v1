/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { 
    unoptimized: true,
    domains: ['image.tmdb.org', 'via.placeholder.com']
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;