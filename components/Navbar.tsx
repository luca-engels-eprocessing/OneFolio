"use client"
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {IconHome,IconSquarePlus,IconClipboardList,IconUserCircle} from "@tabler/icons-react";
import { LoginButton } from "@/components/auth/LoginButton";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export default function Navbar() {

    const [currNav, setCurrNav] = useState("home")
    const {theme} = useTheme()

    return (
        <div className={"sticky top-0 flex flex-row xl:flex-col justify-center items-center xl:h-screen h-[10vh] sm:p-2 bg-sec xl:bg-transparent xl:border-0 border-t-accent border-t-2"}>
            {theme==="light"?
            <Image priority src={"/OneFoliogo_blue.png"} alt={"One Folio"} width={0} height={0} sizes="50vh" className={"xl:absolute xl:h-auto xl:w-full xl:top-8 xl:left-0 h-full w-auto hidden sm:flex"}/>:
            <Image priority src={"/OneFoliogo_white.png"} alt={"One Folio"} width={0} height={0} sizes="50vh" className={"xl:absolute xl:h-auto xl:w-full xl:top-8 xl:left-0 h-full w-auto hidden sm:flex"}/>
            }
            
            <div
                className="border-def transition-colors bg-secondary flex xl:flex-col justify-center gap-2 items-center xl:p-4 p-2 rounded-3xl">
                <Link href={"/"} onClick={()=>setCurrNav("home")} className={cn("btn-nav text-center md:p-4 p-1 rounded-3xl w-full",currNav=="home"&&"text-accent")}>
                    <IconHome size={32} />
                </Link>
                <Link href={"/add"} onClick={()=>setCurrNav("add")} className={cn("btn-nav text-center md:p-4 p-1 rounded-3xl w-full",currNav=="add"&&"text-accent")}>
                    <IconSquarePlus size={32} />
                </Link>
                <Link href={"/overview"} onClick={()=>setCurrNav("overview")} className={cn("btn-nav text-center md:p-4 p-1 rounded-3xl w-full",currNav=="overview"&&"text-accent")}>
                    <IconClipboardList size={32} />
                </Link>
                <Link href={"/settings"} onClick={()=>setCurrNav("settings")} className={cn("btn-nav text-center md:p-4 p-1 rounded-3xl w-full",currNav=="settings"&&"text-accent")}>
                    <IconUserCircle size={32} />
                </Link>
                <LoginButton className={" btn-nav text-center md:p-4 p-1 rounded-3xl w-full flex xl:hidden"}/>
            </div>
        </div>
    );
}
