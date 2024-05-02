'use client'
import { signIn, signOut , useSession } from "next-auth/react";
import React from "react";

const SigninButton = () => {
    const { data: session , status } = useSession();
    
    if (status === "authenticated" && session && session.user) {
        return (
            <li className="flex flex-col">
                <button className="p-4 btn-nav font-normal text-xl rounded-t-2xl border-b-[1px] text-center" onClick={() => signOut()}>{session.user.street}</button>
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

export const UserInformaiton = () => {
    const { data: session } = useSession();

    if(session && session.user){
        console.log(session.user)
        console.log(session)
    }
    return (
        <li></li>
    )

}
export default SigninButton;