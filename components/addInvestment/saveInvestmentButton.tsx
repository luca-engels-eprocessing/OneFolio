import React, { useState } from "react"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { saveData } from "@/utils/saveInvestment"
import { revalidatePath } from "next/cache"



export const SaveButton= ({data,onClick}:{data:{[key: string]:any},onClick:()=>void}) => {
    const [success, setSuccess] = useState<string|undefined>("")  
    const [error, setError] = useState<string|undefined>("")

    let prepData : {title:string,date:string,data:{}}
    Object.entries(data).map(([key,value])=>{
        if(key === "Titel"){
            prepData = {...prepData, title: value}
        }
        else if(key === "Startdatum des Investments"){
            prepData = {...prepData, date: value}
        }
        else{
            if(prepData && prepData.data){
                prepData = {...prepData, data: {...prepData.data, [key]:value}}
            }
            else{
                prepData = {...prepData, data: {[key]:value}}
            }
        }
    })

    return (<>
            <button className='btn-nav w-full rounded-xl text-xl font-semibold py-8' onClick={(e) => {
                setError("")
                setSuccess("")
                saveData(prepData).then((data)=> {
                    setError(data.error)
                    setSuccess(data.success)
                })
                if(data.success){
                    revalidatePath('/overview')
                    revalidatePath('/')
                    onClick()
                }
            }}>Speichern</button>
            <FormError message={error}/>
            <FormSuccess message={success}/>
        </>
    )
}
