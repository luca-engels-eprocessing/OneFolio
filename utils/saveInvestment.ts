"use server"

import { auth } from "@/auth"
import {createInvestment} from "@/utils/db"
import { investmentSchema } from "./zod"
import * as z from "zod"
import { ObjectId } from "bson";

export const saveData = async (data:  z.infer<typeof investmentSchema>): Promise<{success?:string, error?:string}>=> {
    const validatedFields = investmentSchema.safeParse(data);
    const session = await auth()
    if(validatedFields.error){
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
    const response = await createInvestment({
        userId:session.user.id,
        data:{
            title,
            date,
            data:valueData
        }
    });
    if(response.ok){
        return {success: "Investment erfolgreich gespeichert!"}
    }
    return {error: "Es gab ein Problem auf der Serverseite"}
}

