"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { TooltipProvider } from "../ui/tooltip";
import { ThemeProvider } from "../theme-provider";
interface Props {
    children: ReactNode;
}

const Providers = ({ children }: Props) => {
    return (
    <SessionProvider>
        <TooltipProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange >
                {children}
            </ThemeProvider>
        </TooltipProvider>
    </SessionProvider>
    )
}

export default Providers;