'use client'
import { signIn, signOut , useSession } from "next-auth/react";
import React, { ReactNode } from "react";

const SigninButton = () => {
    const { data: session , status } = useSession();
    
    if (status === "authenticated" && session && session.user) {
        return (
            <li className="flex flex-col">
                <button className="p-4 btn-nav font-light text-sm rounded-t-2xl border-b-[1px] text-center" onClick={() => signOut()}>Eingeloggt als: 
                <br />
                <span className="font-normal text-xl">{session.user.firstname + " " + session.user.lastname}</span>
                </button>
                <button className="p-4 btn-nav font-normal text-xl rounded-b-2xl border-t-[1px] text-center" onClick={() => signOut()}>Ausloggen</button>
            </li>
        )
    }
    return (
        <li className="flex flex-col">
            <button className="p-4 btn-nav font-normal text-xl rounded-t-2xl border-b-[1px] text-center" onClick={() => signIn()}>Einloggen</button>
            <button className="p-4 btn-nav font-normal text-xl rounded-b-2xl border-t-[1px] text-center" onClick={() => signIn()}>Registrieren</button>
        </li>
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

export const UserInformaiton = () => {
    const { data: session } = useSession();
    

    if(!session || !session.user){
        return (
            <li></li>
        )
    }
    var c:ReactNode[] = []
    console.log(session.user)
    Object.entries(session.user).map(([key, value]) => {
        c.push(<LiItem name={key} value={value} />)
    })
    console.log(c)
    return <div>
        {c}
    </div>

}
export default SigninButton;