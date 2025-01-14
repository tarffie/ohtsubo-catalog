"use client";

import { Geist, Geist_Mono } from "next/font/google";

import "@/app/globals.css";

import Header from "./header";

import {
  ServiceProvider as Providers,
  useServiceContext,
} from "@/lib/providers/ServiceProvider";
import NotFound from "@/pages/404";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { currentService } = useServiceContext();

  return (
    <html lang="pt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} product-layout antialised`}
      >
        <div>
          <Providers>
            <Header />
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
