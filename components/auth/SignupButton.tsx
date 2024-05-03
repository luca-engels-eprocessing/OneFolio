'use client'
import { signIn, signOut , useSession } from "next-auth/react";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";


type Props = {
    children: ReactNode;
    mode?: "modal" | "redirect",
    asChild?: boolean;
}


const SignupButton = (props:Props) => {
    const { data: session , status } = useSession();
    const router = useRouter();
    
        const onClick = () => {
            router.push("/auth/register")
        }

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

    if (props.mode==="modal"){
        return (
            <span>
                TODO IMPLEMENTR MODAL:
            </span>
        )
    }
    return (
        <span onClick={onClick} className="cursor-pointer">
            {props.children}
        </span>
    )
}

export default SignupButton;