import React from "react";
import { Geist, Geist_Mono } from "next/font/google";

import "@/app/cart/cart.css";

import Header from "@/app/cart/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="cart-layout">
          <Header />
          <main className="cart-content">{children}</main>
        </div>
      </body>
    </html>
  );
}
