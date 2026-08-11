import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://ashiful-portfolio.vercel.app";
const siteTitle = "K. M. Ashiful Islam Istiuk | Junior Software Engineer";
const siteDescription =
  "Portfolio of K. M. Ashiful Islam Istiuk, a junior software engineer experienced with TypeScript, Node.js, NestJS, React, Next.js, REST APIs, microservices, and realtime systems.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | K. M. Ashiful Islam Istiuk",
  },
  description: siteDescription,
  keywords: [
    "Ashiful Islam Istiuk",
    "Software Engineer",
    "NestJS Developer",
    "Next.js Developer",
    "TypeScript",
    "Full Stack Developer Bangladesh",
  ],
  authors: [{ name: "K. M. Ashiful Islam Istiuk" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: "K. M. Ashiful Islam Istiuk",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 1200,
        alt: "K. M. Ashiful Islam Istiuk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/profile.png"],
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
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
