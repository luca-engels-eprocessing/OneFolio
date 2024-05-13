"use client"
import React from 'react'
import {IconLogin,IconLogout} from "@tabler/icons-react"
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'


type Props = {}

export const LoginButton = (props: Props) => {
    const { data: session , status } = useSession();
    const router = useRouter()
    console.log("session",session)

  return (
    <button className="btn-nav p-4 rounded-lg absolute z-10 xl:top-10 bottom-10 xl:right-10 right-5 h-16 w-16 content-center justify-center flex" onClick={()=>{
        if (status === "authenticated" && session && session.user) {
            signOut()
        }
        else{
            router.push("auth/login")
        }
    }}>
        {(status === "authenticated" && session && session.user)?<IconLogout />:<IconLogin />}
    </button>
  )
}
