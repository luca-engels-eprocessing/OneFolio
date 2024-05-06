"use server"

import { auth } from "@/auth"
import {db, getUserById} from "@/utils/db"

export const saveData = async (values: {})=> {
    const session = await auth()


    if(!session||!session.user||!session.user.id){
        return null
    }
    
    const existingUser = await getUserById(session.user.id)
    if(existingUser){
      return {error: "Diese E-Mail wird bereits benutzt."}
    }
    await db.investment.create({
        data: {
            userId:session.user.id,
            data:values,
        }
    });

    return {success: "Erfolgreich erstellt!"}
}