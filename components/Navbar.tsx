"use client"
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {IconHome,IconSquarePlus,IconClipboardList,IconUserCircle} from "@tabler/icons-react";
import { LoginButton } from "@/components/auth/LoginButton";
import { cn } from "@/lib/utils";

export default function Navbar() {

    const [currNav, setCurrNav] = useState("home")

    var isDarkTheme=false
    if(typeof window != "undefined"&&window&&window.matchMedia){
        isDarkTheme=window.matchMedia("(prefers-color-scheme: dark)").matches;
    }


  

    return (
        <div className={"sticky top-0 flex flex-row xl:flex-col justify-center items-center xl:h-screen h-[20vh] sm:p-8 bg-sec xl:bg-transparent"}>
            {isDarkTheme?
            <Image priority src={"/OneFoliogo.png"} alt={"One Folio"} width={0} height={0} sizes="50vh" className={"xl:absolute h-auto w-3/4 xl:top-8 hidden sm:flex"}/>:
            <Image priority src={"/OneFoliogo_big.png"} alt={"One Folio"} width={0} height={0} sizes="50vh" className={"xl:absolute h-auto w-3/4 xl:top-8 hidden sm:flex"}/>
            }
            
            <div
                className="border-def transition-colors bg-secLight dark:bg-secDark flex xl:flex-col justify-center gap-2 items-center p-4 rounded-3xl">
                <Link href={"/"} onClick={()=>setCurrNav("home")} className={cn("btn-nav text-center md:p-4 p-1 rounded-3xl w-full",currNav=="home"&&"text-accentLight")}>
                    <IconHome size={32} />
                </Link>
                <Link href={"/add"} onClick={()=>setCurrNav("add")} className={cn("btn-nav text-center md:p-4 p-1 rounded-3xl w-full",currNav=="add"&&"text-accentLight")}>
                    <IconSquarePlus size={32} />
                </Link>
                <Link href={"/overview"} onClick={()=>setCurrNav("overview")} className={cn("btn-nav text-center md:p-4 p-1 rounded-3xl w-full",currNav=="overview"&&"text-accentLight")}>
                    <IconClipboardList size={32} />
                </Link>
                <Link href={"/settings"} onClick={()=>setCurrNav("settings")} className={cn("btn-nav text-center md:p-4 p-1 rounded-3xl w-full",currNav=="settings"&&"text-accentLight")}>
                    <IconUserCircle size={32} />
                </Link>
                <LoginButton className={" btn-nav text-center md:p-4 p-1 rounded-3xl w-full flex xl:hidden"}/>
            </div>
        </div>
    );
}
