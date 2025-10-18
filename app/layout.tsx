import { ServiceWorkerRegister } from "@/components/service-worker-register";
import { Providers } from "@/components/ui-provider";
import { cn } from "@heroui/react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Varela_Round } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const varelaRound = Varela_Round({
  variable: "--font-varela-round",
  subsets: ["latin"],
  weight: "400",
});

export const viewport: Viewport = {
  themeColor: "black",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "GUID v7 生成器",
  description: "一個簡單的 GUID v7 生成器應用，支援離線使用",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "GUID v7",
  },
};

export const fonts = cn(
  geistSans.variable,
  geistMono.variable,
  varelaRound.variable,
  'touch-manipulation font-sans antialiased'
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fonts}>
        <ServiceWorkerRegister />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
