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
      { source: "/solutions/clinics", destination: "/solutions/clinic-management-software", permanent: true },
      { source: "/solutions/hospitals", destination: "/solutions/hospital-management-software", permanent: true },
      { source: "/solutions/diagnostics", destination: "/solutions/diagnostic-lab-management-software", permanent: true },
      { source: "/solutions/laboratory-management-software", destination: "/solutions/diagnostic-lab-management-software", permanent: true },
      { source: "/solutions/pharmacy", destination: "/solutions/pharmacy-management-software", permanent: true },
      { source: "/solutions/enterprise", destination: "/solutions/enterprise-healthcare-erp", permanent: true },
      { source: "/solutions/government", destination: "/solutions/government-payer-management", permanent: true },
      { source: "/ai/predictive-ops", destination: "/ai/predictive-operations", permanent: true },
      { source: "/product/emr", destination: "/product/electronic-medical-records", permanent: true },
      { source: "/product/clinical", destination: "/product/clinical-emr-opd-ipd", permanent: true },
      { source: "/product/lab", destination: "/product/laboratory", permanent: true },
      { source: "/product/hrm", destination: "/product/workforce-hrm", permanent: true },
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
