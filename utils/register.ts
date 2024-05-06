"use server"

import bcrypt from 'bcryptjs';
import {db, getUserByEmail} from "@/utils/db"
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
    await db.user.create({
        data: {
            name: { firstname, lastname },
            email: email.toLowerCase(),
            password: hashedPassword,
            address: { 
                street: street || null, 
                streetnumber: streetnumber || null, 
                city: city || null, 
                zip:zip || null, 
                country:country || null, 
                phone:phone || null, 
            }
        }
    });

    return {success: "Bestätigungsemail gesendet!"}
}