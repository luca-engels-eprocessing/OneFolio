"use server"

import bcrypt from 'bcryptjs';
import {createUser, getUserByEmail} from "@/utils/db"
import * as z from "zod"
import { signUpSchema } from "@/utils/zod"

export const register = async (values: z.infer<typeof signUpSchema>)=> {
    const validatedFields = signUpSchema.safeParse(values)

    if(!validatedFields.success){
        return {error: "Es gab einen Fehler!"}
    }   

    const { email,password,firstname,lastname,street,streetnumber,city,zip,country,phone}= validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)


    const existingUser = await getUserByEmail(email)
    if(existingUser){
      return {error: "Diese E-Mail wird bereits benutzt."}
    }
    await createUser({
        name: { firstname, lastname },
        email: email.toLowerCase(),
        password: hashedPassword,
        address: { 
            street: street || undefined, 
            streetnumber: streetnumber || undefined, 
            zip:zip || undefined, 
            city: city || undefined, 
            country:country || undefined, 
            phone:phone || undefined, 
        }
    });

    return {success: "JETZT ANMELDEN!"}
}