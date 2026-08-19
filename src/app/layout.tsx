import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

import { PlayerProvider } from "@/providers/PlayerProvider";
import BottomNav from "@/components/BottomNav";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "600", "700", "800", "900"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Kids Daily Planner — Jagoan Kecilku! 🌟",
  description:
    "Aplikasi jadwal harian anak yang menyenangkan. Bantu jagoan kecilmu menyelesaikan misi dan rutinitas sehari-hari dengan cara yang seru!",
};

export const viewport = {
  themeColor: '#FCD34D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`h-full antialiased ${nunito.variable}`}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="min-h-full flex flex-col bg-surface font-sans">
        <PlayerProvider>
          {children}
          <BottomNav />
        </PlayerProvider>
      </body>
    </html>
  );
}
