/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Hide the floating Next.js "N" badge in local development
  devIndicators: false,
  // Pricing temporarily removed from the marketing site
  async redirects() {
    return [
      { source: "/pricing", destination: "/demo", permanent: false },
      { source: "/pricing/roi-calculator", destination: "/demo", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "api.dicebear.com" },
    ],
  },
};

export default nextConfig;
