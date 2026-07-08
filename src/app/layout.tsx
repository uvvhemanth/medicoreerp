import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ToastProvider } from "@/components/ui/toast";

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
  metadataBase: new URL("https://aether.health"),
  title: {
    default: "Aether Health OS — The AI-native Hospital Operating System",
    template: "%s · Aether Health OS",
  },
  description:
    "Run the entire hospital on one AI-native platform — clinical, operational, and financial. Interoperable by default, fast to deploy, honestly priced.",
  keywords: [
    "hospital information system",
    "HIS",
    "healthcare ERP",
    "FHIR",
    "AI medical scribe",
    "Epic alternative",
  ],
  openGraph: {
    title: "Aether Health OS",
    description: "The AI-native Hospital Operating System.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} font-sans antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>{children}</ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
