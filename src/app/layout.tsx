import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToastProvider } from "@/components/ui/toast";
import { JsonLd } from "@/components/marketing/json-ld";
import { HideNextDevBadge } from "@/components/marketing/hide-next-dev-badge";
import { organizationJsonLd, softwareApplicationJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/content/marketing";

const GA_MEASUREMENT_ID = "G-Q82LRBQGTP";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Best Hospital Management System in Hyderabad | MedicoreERP",
    template: "%s | MedicoreERP",
  },
  description:
    "Looking for the best Hospital Management System in Hyderabad? MedicoreERP simplifies EMR, OPD, IPD, billing, pharmacy, laboratory, radiology, inventory and complete hospital operations.",
  keywords: [
    "best hospital management system in Hyderabad",
    "hospital management system Hyderabad",
    "HIS software Hyderabad",
    "hospital information system",
    "HIS",
    "healthcare ERP",
    "medical ERP",
    "hospital software India",
    "clinic management software",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Best Hospital Management System in Hyderabad | MedicoreERP",
    description:
      "Looking for the best Hospital Management System in Hyderabad? MedicoreERP simplifies EMR, OPD, IPD, billing, pharmacy, laboratory, radiology, inventory and complete hospital operations.",
    type: "website",
    url: SITE_URL,
    siteName: "MedicoreERP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Hospital Management System in Hyderabad | MedicoreERP",
    description:
      "Looking for the best Hospital Management System in Hyderabad? MedicoreERP simplifies EMR, OPD, IPD, billing, pharmacy, laboratory, radiology, inventory and complete hospital operations.",
  },
  robots: { index: true, follow: true },
  verification: {
    google: "googlea42bc3bc7d85ea98.html",
    other: {
      "msvalidate.01": "6AB545078D151CCA74FADD1EEDA0555B",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${manrope.variable} font-sans antialiased`}>
        <JsonLd data={[organizationJsonLd(), softwareApplicationJsonLd()]} />
        <ThemeProvider>
          <HideNextDevBadge />
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
