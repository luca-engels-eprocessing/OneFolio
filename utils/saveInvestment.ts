"use server"

import { auth } from "@/auth"
import {db, getUserById} from "@/utils/db"
import { investmentSchema } from "./zod"
import * as z from "zod"

export const saveData = async (data:  z.infer<typeof investmentSchema>)=> {
    const validatedFields = investmentSchema.safeParse(data);
    const session = await auth()
    if(validatedFields.error){
        return {error: validatedFields.error.message.toString()}
    }
    const {title,date,data: fieldData} = validatedFields.data
    const valueData:any[] = []
    if(fieldData){
        Object.entries(fieldData).map(([key,value])=>{
            const data = {key:key,value:String(value)}
            valueData.push(data)
        })
    }
    if(!session||!session.user||!session.user.id){
        return {error: "Es gab einen Fehler beim laden der Nutzerdaten!"}
    }
    await db.investment.create({
        data: {
            userId:session.user.id,
            data:{
                title,
                date,
                data:valueData
            }
        }
    });
    return {success: "Investment erfolgreich gespeichert!"}
}

