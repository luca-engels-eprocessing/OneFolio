"use server"

import * as z from "zod"
import { signInSchema } from "@/utils/zod"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"

export const login = async (values: z.infer<typeof signInSchema>)=> {
    const validatedFields = signInSchema.safeParse(values)

    if(!validatedFields.success){
        return {error: "Es gab einen Fehler!"}
    }

    const {email,password} = validatedFields.data

    try {
        await signIn("credentials", {email,password, redirectTo:DEFAULT_LOGIN_REDIRECT})

    } catch (error) {
        if(error instanceof AuthError) {
            switch (error.type){
                case "CredentialsSignin":
                    return {error:"E-Mail oder Password falsch!"}
                default:
                    return  {error:"Es gab einen Fehler!"}
            }
        }
        throw error
    }
    return {success: "Wird weitergeleitet..."}
}