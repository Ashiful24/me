import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { fetchPortfolio } from "@/lib/portfolio";
import { resolveAssetUrl } from "@/lib/auth-storage";
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

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await fetchPortfolio();
  const profile = portfolio?.profile;

  if (!profile) {
    return {
      title: "Portfolio",
      description: "Personal portfolio",
    };
  }

  const title = profile.siteTitle || profile.name;
  const description = profile.siteDescription || profile.bio;
  const siteUrl = profile.siteUrl || undefined;
  const avatar = resolveAssetUrl(profile.avatarUrl) || undefined;

  return {
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    title: {
      default: title,
      template: `%s | ${profile.name}`,
    },
    description,
    authors: [{ name: profile.name }],
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      type: "website",
      url: siteUrl,
      title,
      description,
      siteName: profile.name,
      images: avatar
        ? [{ url: avatar, width: 1200, height: 1200, alt: profile.name }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: avatar ? [avatar] : undefined,
    },
  };
}

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
