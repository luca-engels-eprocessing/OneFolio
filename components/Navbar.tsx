import Link from "next/link";
import Image from "next/image";
import React from "react";
import {IconHome,IconSquarePlus,IconClipboardList,IconUserCircle} from "@tabler/icons-react";

export default function Navbar() {


    return (
        <div className={"sticky top-0 flex flex-row xl:flex-col justify-center items-center xl:h-screen h-40 p-8 bg-sec xl:bg-transparent"}>
            <Image src={"/OneFolio_2.png"} alt={"One Folio"} width={150} height={150} className={"xl:absolute xl:top-8 hidden sm:flex"}/>
            <div
                className="border-def transition-colors bg-secLight dark:bg-secDark flex xl:flex-col justify-center gap-2 items-center p-4 rounded-3xl">
                <Link href={"/"} className={"btn-nav text-center md:p-4 p-1 rounded-3xl w-full"}>
                    <IconHome size={32} />
                </Link>
                <Link href={"/add"} className={"btn-nav text-center md:p-4 p-1  rounded-3xl w-full"}>
                    <IconSquarePlus size={32} />
                </Link>
                <Link href={"/overview"} className={"btn-nav text-center md:p-4 p-1  rounded-3xl w-full"}>
                    <IconClipboardList size={32} />
                </Link>
                <Link href={"/settings"} className={"btn-nav text-center md:p-4 p-1  rounded-3xl w-full"}>
                    <IconUserCircle size={32} />
                </Link>
            </div>
        </div>
    );
}
