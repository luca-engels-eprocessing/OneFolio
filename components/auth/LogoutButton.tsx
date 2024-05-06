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
            <div className="flex flex-col my-2" key={"-1"}>
                <button className="p-4 btn-nav font-normal text-sm rounded-2xl text-left" onClick={() => signOut()}>
                    <p className="text-textLight/70 dark:text-textDark/70">Sie sind eingeloggt.</p>
                    <span className="font-normal text-xl">Ausloggen?</span>
                </button>
            </div>
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


const LiItem = ({name:key,value:value,index:index}:{name: string,value:any,index:number}) => {
        if (typeof value === "object" && value != null){
            const entry : ReactNode[] = []
            Object.entries(value).map(([keyInner,valueInner],indexInner)=>{
                entry.push(<LiItem name={keyInner} value={valueInner} index={(index)+(indexInner/10.0)} key={(index)+(indexInner/10.0)}/>)
            });
            return <div className="grid grid-cols-2 gap-x-4" key={index}>{entry}</div>
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
            
        return (
            <div className='p-4 btn-nav my-2 font-light text-sm rounded-2xl text-textLight/70 dark:text-textDark/70' key={index}>{key + ":"}
            <br></br>
                <span className='font-normal text-xl text-textLight/50 dark:text-textDark/50'>Jetzt hinzufügen!</span>
            </div>
        )
        }
        return (
            <div className='p-4 btn-nav my-2 font-light text-sm rounded-2xl'><p className="text-textLight/70 dark:text-textDark/50" key={index}>{key + ":"}</p>
                <span className='font-normal text-xl text-textLight dark:text-textDark'>{value}</span>
            </div>
        )
    }

export const UserInformaiton = ({info}:{info:{}|null}) => {

    if (!info) {
        return (
            <div></div>
        )
    }
    var c: ReactNode[] = []
    console.log("User: ", info)
    Object.entries(info).map(([key, value],index) => {
        c.push(<LiItem name={key} value={value} index={index} key={index}/>)
    })
    return <>
        {c}
    </>

}
