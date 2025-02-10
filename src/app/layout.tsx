import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ohtsubo-catalog",
  description: "made by tarffienation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className={`antialiased`}>
        <div className="w-full max-w-full">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <main className="w-full">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
