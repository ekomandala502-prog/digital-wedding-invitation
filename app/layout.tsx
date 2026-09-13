import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-great-vibes" });

export const metadata: Metadata = {
  // 1. Ini WAJIB ADA supaya WhatsApp di HP tau domain aslinya
  metadataBase: new URL("https://grisha.my.id"), 
  
  title: "The Wedding of Selvi & Eko",
  description: "Undangan Pernikahan",
  
  // 2. Ini WAJIB ADA supaya judul dan deskripsi rapi di chat WA
  openGraph: {
    title: "The Wedding of Selvi & Eko",
    description: "Undangan Pernikahan",
    url: "https://grisha.my.id/selviana-dan-eko",
    siteName: "Undangan Pernikahan Selvi & Eko",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} ${greatVibes.variable} font-sans bg-ivory text-charcoal antialiased`}>
        {children}
      </body>
    </html>
  );
}