import { Geist, Geist_Mono } from "next/font/google";

import "@/app/globals.css";

import Header from "./header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function NewServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} product-layout antialised`}
      >
        <div>
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
