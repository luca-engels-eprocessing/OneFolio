import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import React from "react";
import Providers from "@/components/auth/provider";
import {LoginButton} from "@/components/auth/LoginButton"

const inter = Roboto({ subsets: ["latin"], weight: ["100","300","400","500","700","900"]});


export const metadata: Metadata = {
  title: "OneFolio",
  description: "OneFolio ermöglicht das einfache Managen ihrer Investment über alle platformen. So halten sie den Überblick",
  appleWebApp: true,
  
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
              <LoginButton/>
              <div className={"flex xl:flex-row-reverse sm:flex-col flex-col justify-evenly h-screen"}>
                <div className={"w-full xl:h-full xl:pb-8 h-[80vh] pt-16"}>
                  {children}
                </div>
                <Navbar/>
              </div>
            </Providers>
          </body>
        </html>
  );
}
