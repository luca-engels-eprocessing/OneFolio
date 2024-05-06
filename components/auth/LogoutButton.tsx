'use client'
import { signOut , useSession } from "next-auth/react";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
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
            <li className="flex flex-col my-2">
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


const LiItem = ({name:key,value:value}:{name: string,value:any}) => {
        if (typeof value === "object" && value != null){
            const entry : ReactNode[] = []
            Object.entries(value).map(([keyInner,valueInner])=>{
                entry.push(<LiItem name={keyInner} value={valueInner} />)
            });
            return <div className="grid grid-cols-2 gap-x-4">{entry}</div>
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
            case "streetnumber":
                key="Hausnummer"
                break;
            case "zip":
                key="Postleitzahl"
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
        if(value == null){
            value = "Jetzt einfügen"
        }
        return (
            <li className='p-4 btn-nav my-2 font-light text-sm rounded-2xl'>{key + ":"}
            <br></br>
                <span className='font-normal text-xl'>{value}</span>
            </li>
        )
    }

export const UserInformaiton = ({info}:{info:{}|null}) => {

    if (!info) {
        return (
            <li></li>
        )
    }
    var c: ReactNode[] = []
    console.log("User: ", info)
    Object.entries(info).map(([key, value]) => {
        c.push(<LiItem name={key} value={value} />)
    })
    return <div>
        {c}
    </div>

}
