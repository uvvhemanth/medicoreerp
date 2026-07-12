import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToastProvider } from "@/components/ui/toast";
import { JsonLd } from "@/components/marketing/json-ld";
import { HideNextDevBadge } from "@/components/marketing/hide-next-dev-badge";
import { organizationJsonLd, softwareApplicationJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/content/marketing";

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
    default: "MedicoreERP — The AI-native Hospital Operating System",
    template: "%s · MedicoreERP",
  },
  description:
    "Run the entire hospital on one AI-native medical ERP — clinical, operational, and financial. Interoperable by default, fast to deploy, honestly priced.",
  keywords: [
    "hospital information system",
    "HIS",
    "healthcare ERP",
    "medical ERP",
    "FHIR",
    "AI medical scribe",
    "Epic alternative",
    "hospital software India",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "MedicoreERP",
    description: "The AI-native Hospital Operating System — medical ERP for clinics and hospitals.",
    type: "website",
    url: SITE_URL,
    siteName: "MedicoreERP",
  },
  twitter: {
    card: "summary_large_image",
    title: "MedicoreERP",
    description: "The AI-native Hospital Operating System.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
