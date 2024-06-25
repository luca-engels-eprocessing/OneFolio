"use client"
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {IconHome,IconSquarePlus,IconClipboardList,IconUserCircle} from "@tabler/icons-react";
import { LoginButton } from "@/components/auth/LoginButton";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { ModeToggle } from "./themeButton";

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
                className="border-def transition-colors bg-secondary flex xl:flex-col justify-center gap-2 items-center xl:p-4 py-1 px-2 rounded-3xl">
                <Link href={"/"} onClick={()=>setCurrNav("home")} className={cn("btn-nav text-center xl:p-4 p-2 xl:rounded-3xl rounded-xl h-fit w-full",currNav=="home"&&"text-accent")}>
                    <IconHome className="w-6 md:w-8 h-6 md:h-8" />
                </Link>
                <Link href={"/add"} onClick={()=>setCurrNav("add")} className={cn("btn-nav text-center xl:p-4 p-2 xl:rounded-3xl rounded-xl h-fit w-full",currNav=="add"&&"text-accent")}>
                    <IconSquarePlus className="w-6 md:w-8 h-6 md:h-8"/>
                </Link>
                <Link href={"/overview"} onClick={()=>setCurrNav("overview")} className={cn("btn-nav text-center xl:p-4 p-2 xl:rounded-3xl rounded-xl h-fit w-full",currNav=="overview"&&"text-accent")}>
                    <IconClipboardList className="w-6 md:w-8 h-6 md:h-8" />
                </Link>
                <Link href={"/settings"} onClick={()=>setCurrNav("settings")} className={cn("btn-nav text-center xl:p-4 p-2 xl:rounded-3xl rounded-xl h-fit w-full",currNav=="settings"&&"text-accent")}>
                    <IconUserCircle className="w-6 md:w-8 h-6 md:h-8"/>
                </Link>
                <LoginButton className={" btn-nav text-center mxl:p-4 p-2 xl:rounded-3xl rounded-xl  w-full flex xl:hidden"} iconClass={"w-6 md:w-8 h-6 md:h-8"}/>
                <ModeToggle className={" btn-nav text-center mxl:p-4 p-2 xl:rounded-3xl rounded-xl  w-full xl:hidden flex"} iconClass={"w-6 md:w-8 h-6 md:h-8"}/>
            </div>
        </div>
    );
}
