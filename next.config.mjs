/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    globalNotFound: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable filesystem cache in development to prevent ENOENT
      // pack.gz corruption errors on Windows during hot reloads
      config.cache = false;
    }
    return config;
  },
  async redirects() {
    return [
      { source: '/sign-up', destination: '/signup', permanent: true },
      { source: '/sign-in', destination: '/login', permanent: true },
      { source: '/signin', destination: '/login', permanent: true },
    ];
  },
};

export default nextConfig;


