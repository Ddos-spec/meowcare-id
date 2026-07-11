import type { Metadata, Viewport } from "next";
import { Inter, Baloo_2 } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MeowCare ID — Local-First MVP Perawatan Kucing",
  description:
    "MeowCare ID adalah MVP local-first + Postgres sync untuk profil kucing, pengingat perawatan, triase gejala lokal, riwayat health check, dan kontak layanan.",
  manifest: "/manifest.webmanifest",
  applicationName: "MeowCare ID",
  appleWebApp: {
    capable: true,
    title: "MeowCare",
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/app-icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/app-icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f0672a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${baloo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-sans">
        {children}
      </body>
    </html>
  );
}

