"use client"
import React from 'react'
import {IconLogin,IconLogout} from "@tabler/icons-react"
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { signOut, useSession } from 'next-auth/react'


type Props = {
    className?:string,
    title?:boolean
}

export const LoginButton = (props: Props) => {
    const { data: session , status } = useSession();
    const router = useRouter()

  return (
    <button className={cn(" content-end items-center justify-center flex",props.className)} onClick={()=>{
        if (status === "authenticated" && session && session.user) {
            signOut()
        }
        else{
            router.push("auth/login")
        }
    }}>
        {props.title && (
            <p className="text-white font-bold">
                {status === "authenticated" ? "Ausloggen" : "Einloggen"}
            </p>
        )}
        {status === "authenticated" ? <IconLogout size={32} /> : <IconLogin size={32} />}
    </button>
  )
}
