import type { Metadata } from "next";
import "./globals.css";
import { Inter, PT_Serif, Noto_Sans } from 'next/font/google';
// Components
import NavLinks from "../app/components/NavLinks";
import HeaderNotice from "../app/components/HeaderNotice";
import Footer from "../app/components/Footer";
import { LoadingProvider } from "@/context/LoadingProvider";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Analytics } from '@vercel/analytics/next';
import Script from "next/script";

config.autoAddCss = false;

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
});

const ptSerif = PT_Serif({
  variable: '--font-pt-serif',
  subsets: ['latin'],
  weight: ['400', '700'], 
});

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
});

export const metadata: Metadata = {
  title: "Sri Sringeri Sharada Peetham",
  description: "Jagadguru Shankaracharya Maha Samsthanam, Sringeri",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="/scripts/sanscript.js"
          strategy="beforeInteractive" // or "lazyOnload", "afterInteractive"
        />
      </head>
      <body
        className={`${inter.variable} ${ptSerif.variable} ${notoSans.variable} antialiased`}
      >
        <LoadingProvider>
          <HeaderNotice />
          <NavLinks />
      
          {children}
      
          <Footer />
        </LoadingProvider>

        <Analytics />
      </body>
    </html>
  );
}
