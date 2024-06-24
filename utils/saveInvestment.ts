"use server"

import { auth } from "@/auth"
import {createInvestment,createMultipleInvestment} from "@/utils/db"
import { investmentSchema } from "./zod"
import * as z from "zod"

export const saveData = async (data:  z.infer<typeof investmentSchema>): Promise<{success?:string, error?:string}>=> {
    const validatedFields = investmentSchema.safeParse(data);
    const session = await auth()
    if(validatedFields.error){
        if(validatedFields.error.errors[0].message=='Required'&&validatedFields.error.errors[0]['expected' as keyof typeof validatedFields.error.errors[0]]=='object'){
            return {error: "Dein Investment hat keine Daten. Füge mehr Informationen hinzu"}
        }
        return {error: validatedFields.error.errors[0].message}    
    }
    let {title, date, Summe,...fieldData} = validatedFields.data
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
            Summe,
            ...fieldData
        }
    });
    if(response.ok){
        return {success: "Investment erfolgreich gespeichert!"}
    }
    return {error: "Es gab ein Problem auf der Serverseite"}
}

export const saveMultipleData = async (data:  z.infer<typeof investmentSchema>[]): Promise<{success?:string, error?:string}>=> {
    const session = await auth()
    const fieldData = data
    if ((!fieldData||fieldData.length === 0)) {
        return {error: "Dein Investment hat keine Daten. Füge mehr Informationen hinzu"}
    }
    if(!session||!session.user||!session.user.id){
        return {error: "Es gab einen Fehler beim laden der Nutzerdaten!"}
    }
    const valueDatas :any[] = []
    fieldData.forEach((data)=>{
        let {title, date, Summe,...fieldData} = data
        if (!data&&(!fieldData||Object.keys(fieldData).length === 0)) {
            return {error: "Dein Investment hat keine Daten. Füge mehr Informationen hinzu"}
        }
        if(!title){
            return {error: "Bitte füge einen Titel für dein Investment ein"}    
        }
        if(!Summe){
            return {error: "Bitte füge einen Summe für dein Investment ein"}    
        }
        const valueData: any[] = []
        if (fieldData) {
            Object.entries(fieldData).map(([key,value])=>{
                const data = {key:key,value:String(value)}
                valueData.push(data)
            })
        }
        valueDatas.push({userId:session.user?.id,data:{title,date,Summe,...fieldData}})
    })
    const response = await createMultipleInvestment(valueDatas);
    if(response.ok){
        return {success: "Investment erfolgreich gespeichert!"}
    }
    return {error: "Es gab ein Problem auf der Serverseite"}
}