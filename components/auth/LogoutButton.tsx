'use client'
import { signIn, signOut , useSession } from "next-auth/react";
import React, { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserById } from "@/utils/db";


type Props = {
    mode?: "modal" | "redirect",
    asChild?: boolean;
}


export const LogoutButton = (props:Props) => {
    const { data: session , status } = useSession();
    const router = useRouter();
    
        const onClick = () => {
            router.push("/auth/login")
        }

    if (status === "authenticated" && session && session.user) {
        return (
            <li className="flex flex-col">
                <button className="p-4 btn-nav font-normal text-sm rounded-2xl text-left" onClick={() => signOut()}>
                    <span>Sie sind eingeloggt !</span>
                    <br />
                    <span className="font-normal text-xl">Ausloggen?</span>
                </button>
            </li>
        )
    }
    return (
        <span onClick={onClick} className="cursor-pointer">
            <div className="flex flex-col">
                <button className="p-4 btn-nav font-normal text-xl rounded-2xl text-center">Laden...</button>
              </div>
        </span>
    )
}


const LiItem = ({name:key,value:value}:{name: string,value:string}) => {
        if (typeof value === "object"){
            return <></>;
        }

        switch (key) {
            case "email":
                key="E-mail"
                break;
            case "firstname":
                key="Vorname"
                break;
            case "name":
                key="Name"
                break;
            case "lastname":
                key="Nachname"
                break;
            case "street":
                key="Straße"
                break;
            case "city":
                key="Stadt"
                break;
            case "country":
                key="Land"
                break;
            case "phone":
                key="Telefon"
                break;
            default:
                break;
        }
        return (
            <li className='p-4 btn-nav my-2 font-light text-sm rounded-2xl'>{key + ":"}
            <br></br>
                <span className='font-normal text-xl'>{value}</span>
            </li>
        )
    }

export const UserInformaiton = ({info}:{info:any}) => {
    const { data: session } = useSession();

    if (!session || !session.user || !session.user.id) {
        return (
            <li></li>
        )
    }
    var c: ReactNode[] = []
    console.log("User: ", info)
    Object.entries(session.user).map(([key, value]) => {
        c.push(<LiItem name={key} value={value} />)
    })
    console.log(c)
    return <div>
        {c}
    </div>

}
