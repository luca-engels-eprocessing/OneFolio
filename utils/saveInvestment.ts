"use server"

import { auth } from "@/auth"
import {db, getUserById} from "@/utils/db"
import { investmentSchema } from "./zod"
import * as z from "zod"

export const saveData = async (values:  z.infer<typeof investmentSchema>)=> {
    console.log("VALUES",values)
    const validatedFields = investmentSchema.safeParse(values);
    console.log("FIelds",validatedFields)
    const session = await auth()

    if(validatedFields.error){
        return {error: "Es gab einen Fehler!"}
    }
    const {title,date,data} = validatedFields.data

    const valueData:any[] = []
    if(data){
        Object.entries(data).map(([key,value])=>{
            const data = {key:key,value:String(value)}
            valueData.push(data)
        })
    }

    console.log("ValueData",valueData)


    if(!session||!session.user||!session.user.id){
        return {error: "Es gab einen Fehler"}
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