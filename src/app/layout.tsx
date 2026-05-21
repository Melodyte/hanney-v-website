import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";

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
  title: "Hanney-V | Where Tradition Meets Tailored Elegance",
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
