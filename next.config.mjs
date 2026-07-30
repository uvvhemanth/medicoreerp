/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Hide the floating Next.js "N" badge in local development
  devIndicators: false,
  // Pricing + Resources dropdown pages temporarily removed from the marketing site
  async redirects() {
    return [
      { source: "/pricing", destination: "/demo", permanent: false },
      { source: "/pricing/roi-calculator", destination: "/demo", permanent: false },
      // Hidden Resources dropdown pages
      { source: "/resources/guides", destination: "/resources", permanent: false },
      { source: "/resources/guides/:path*", destination: "/resources", permanent: false },
      { source: "/resources/webinars", destination: "/resources", permanent: false },
      { source: "/resources/webinars/:path*", destination: "/resources", permanent: false },
      { source: "/resources/glossary", destination: "/resources", permanent: false },
      { source: "/resources/glossary/:path*", destination: "/resources", permanent: false },
      { source: "/resources/changelog", destination: "/resources", permanent: false },
      { source: "/customers", destination: "/", permanent: false },
      { source: "/customers/:path*", destination: "/", permanent: false },
      { source: "/compare", destination: "/", permanent: false },
      { source: "/compare/:path*", destination: "/", permanent: false },
      { source: "/developers", destination: "/interoperability", permanent: false },
      { source: "/developers/:path*", destination: "/interoperability", permanent: false },
      { source: "/company/careers", destination: "/company/about", permanent: false },
      { source: "/company/careers/:path*", destination: "/company/about", permanent: false },
      { source: "/company/partners", destination: "/company/about", permanent: false },
      { source: "/company/press", destination: "/company/about", permanent: false },
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
