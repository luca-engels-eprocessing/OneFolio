import React, { useState } from "react"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { saveData,saveMultipleData } from "@/utils/saveInvestment"
import { revalidatePath } from "next/cache"
import { DatasetController } from "chart.js"



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
                if(success!=''){
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

export const SaveCSVButton = ({data,onClick}:{data:{}[],onClick:()=>void}) => {
    const [success, setSuccess] = useState<string|undefined>("")  
    const [error, setError] = useState<string|undefined>("")

    const prepDataList : {title:string,date:any,data:any}[] = []

    data.forEach((data)=>{
        let prepData : {title:string,date:string,data:{}}
        Object.entries(data).map(([key,value])=>{
            if (key === "Titel") {
                prepData = {...prepData, title: value as string};
            }
            else if (key.toLocaleLowerCase().includes("start")&&key.toLocaleLowerCase().includes("datum")) {
                prepData = {...prepData, date: value as string};
            }
            else {
                if (prepData && prepData.data) {
                    prepData = {...prepData, data: {...prepData.data, [key]: value}};
                }
                else {
                    prepData = {...prepData, data: {[key]: value}};
                }
            }
        })
        prepDataList.push(prepData!)
    })
    return (<>
            <button className='btn-nav w-full rounded-xl text-xl font-semibold py-8' onClick={(e) => {
                setError("")
                setSuccess("")
                saveMultipleData(prepDataList).then((datas)=> {
                    setError(datas.error)
                    setSuccess(datas.success)
                })
                if(success!=""){
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
