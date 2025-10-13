import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bastards WL Checker",
  description: "Checker for Bastards NFT.",
  icons: {
    icon: [
      { url: '/bas_logo.jpg', type: 'image/jpg' },
    ],
  },
  openGraph: {
    title: "Bastards WL Checker",
    description: "Checker for Bastards NFT.",
    url: "https://bastards-checker.vercel.app/",
    images: [
      {
        url: '/banner.png?v=2', 
        width: 1023,
        height: 721,
        alt: 'Bastards Banner',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bastards WL Checker",
    description: "Checker for Bastards NFT.",
    images: ['/banner.png?v=2'], 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">  
      <head>
        <link rel="icon" href="/bas_logo.jpg" type="image/jpg" />
        <link href="https://fonts.googleapis.com/css2?family=Rouge+Script&display=swap" rel="stylesheet"/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}