import Link from "next/link";
import Image from "next/image";
import React from "react";
import {IconHomeStats,IconSquarePlus,IconPigMoney,IconServerCog} from "@tabler/icons-react";

export default function Navbar() {


    return (
        <div className={"sticky top-0 flex justify-center items-center h-screen p-8"}>
            <div
                className="border-def transition-colors bg-secLight dark:bg-secDark flex flex-col justify-center gap-2 items-center p-4 rounded-3xl">
                <Image src={"/OneFolio_2.png"} alt={"One Folio"} width={150} height={150} className={"absolute top-8"}/>
                <Link href={"/"} className={"btn-nav text-center p-4 rounded-[8px] w-full"}>
                    <IconHomeStats size={32} />
                </Link>
                <Link href={"/add"} className={"btn-nav text-center p-4 rounded-[8px] w-full"}>
                    <IconSquarePlus size={32} />
                </Link>
                <Link href={"/overview"} className={"btn-nav text-center p-4 rounded-[8px] w-full"}>
                    <IconPigMoney size={32} />
                </Link>
                <Link href={"/settings"} className={"btn-nav text-center p-4 rounded-[8px] w-full"}>
                    <IconServerCog size={32} />
                </Link>
            </div>
        </div>
    );
}
