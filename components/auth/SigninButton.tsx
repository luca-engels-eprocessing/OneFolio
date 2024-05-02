'use client'
import { signIn, signOut , useSession } from "next-auth/react";
import React, { ReactNode } from "react";

const SigninButton = () => {
    const { data: session , status } = useSession();
    
    if (status === "authenticated" && session && session.user) {
        return (
            <li className="flex flex-col">
                <button className="p-4 btn-nav font-normal text-xl rounded-t-2xl border-b-[1px] text-center" onClick={() => signOut()}>{session.user.firstname + " " + session.user.lastname}</button>
                <button className="p-4 btn-nav font-normal text-xl rounded-b-2xl border-t-[1px] text-center" onClick={() => signOut()}>Sign out</button>
            </li>
        )
    }
    return (
        <li className="flex flex-col">
            <button className="p-4 btn-nav font-normal text-xl rounded-t-2xl border-b-[1px] text-center" onClick={() => signIn()}>Sign in</button>
            <button className="p-4 btn-nav font-normal text-xl rounded-b-2xl border-t-[1px] text-center" onClick={() => signIn()}>Register</button>
        </li>
    )
}


const LiItem = ({name:key,value:value}:{name: string,value:string}) => {
        if (typeof value === "object"){
            return <></>;
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