import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hanney-V | Where Tradition Meets Tailored Elegance",
    template: "%s | Hanney-V",
  },
  description:
    "Luxury fashion brand specializing in bespoke menswear, bridal couture, and cultural event styling in Akure, Nigeria.",
  keywords: [
    "fashion",
    "bespoke",
    "tailoring",
    "bridal",
    "aso-oke",
    "Nigeria",
    "Akure",
    "traditional wear",
    "event styling",
  ],
  openGraph: {
    title: "Hanney-V | Luxury Fashion Brand",
    description:
      "Bespoke menswear, bridal couture, and cultural event styling.",
    type: "website",
    siteName: "Hanney-V",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hanney-V | Luxury Fashion Brand",
    description:
      "Bespoke menswear, bridal couture, and cultural event styling.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
