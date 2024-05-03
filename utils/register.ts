"use server"

import * as z from "zod"
import { signUpSchema } from "@/utils/zod"

export const register = async (values: z.infer<typeof signUpSchema>)=> {
    const validatedFields = signUpSchema.safeParse(values)

    if(!validatedFields.success){
        return {error: "Es gab einen Fehler!"}
    }   
    return {success: "Bestätigungsemail gesendet"}
}