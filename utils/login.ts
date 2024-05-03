"use server"

import * as z from "zod"
import { signInSchema } from "@/utils/zod"

export const login = async (values: z.infer<typeof signInSchema>)=> {
    const validatedFields = signInSchema.safeParse(values)

    if(!validatedFields.success){
        return {error: "Es gab einen Fehler!"}
    }   
    return {success: "Wird weitergeleitet..."}
}