import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import React from "react";
import Providers from "@/components/auth/provider";

const inter = Roboto({ subsets: ["latin"], weight: ["100","300","400","500","700","900"]});


export const metadata: Metadata = {
  title: "OneFolio",
  description: "OneFolio ermöglicht das einfache Managen ihrer Investment über alle platformen. So halten sie den Überblick",
  icons: {
    shortcut: "/images/favicon.ico",
    apple: "/images/logo512.png",
    icon: "/images/logo512.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
          <body className={inter.className}>
            <Providers>
              <div className={"flex xl:flex-row sm:flex-col-reverse flex-col justify-between h-screen"}>
                  {children}
                  <Navbar/>
              </div>
            </Providers>
          </body>
        </html>
  );
}
