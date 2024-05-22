"use server"

import { auth } from "@/auth"
import {db, getUserById} from "@/utils/db"
import { investmentSchema } from "./zod"
import * as z from "zod"

export const saveData = async (data:  z.infer<typeof investmentSchema>): Promise<{success?:string, error?:string}>=> {
    const validatedFields = investmentSchema.safeParse(data);
    const session = await auth()
    if(validatedFields.error){
        console.log(validatedFields)
        return {error: "Bitte füge einen Titel für dein Investment ein"}    
    }
    let {title, date, data: fieldData} = validatedFields.data
    if (!data&&(!fieldData||Object.keys(fieldData).length === 0)) {
        return {error: "Dein Investment hat keine Daten. Füge mehr Informationen hinzu"}
    }
    const valueData: any[] = []
    if (fieldData) {
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

