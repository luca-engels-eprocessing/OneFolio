import React, { useState } from "react"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { saveData,saveMultipleData } from "@/utils/saveInvestment"
import { useRouter } from "next/navigation"



export const SaveButton= ({data,onClick}:{data:{[key: string]:any},onClick:()=>void}) => {
    const [success, setSuccess] = useState<string|undefined>("")  
    const [error, setError] = useState<string|undefined>("")
    const router = useRouter()

    let prepData : {title:string,date:string,Summe:string,[rest:string]:string}
        Object.entries(data).map(([key,value])=>{
        if(key === "Titel"){
            prepData = {...prepData, title: value}
        }
        else if(key.toLocaleLowerCase().includes("start")&&key.toLocaleLowerCase().includes("datum")){
            prepData = {...prepData, date: value}
        }
        else{
            prepData = {...prepData, [key]:value}
        }
    })
    return (<>
            <button className='btn-nav w-full rounded-md text-big font-semibold py-8' onClick={(e) => {
                setError("")
                setSuccess("")
                saveData(prepData).then((data)=> {
                    setError(data.error)
                    setSuccess(data.success)
                })
                if(success!=''){
                    router.refresh()
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
    const router = useRouter()

    
    const prepDataList : {title:string,date:string,Summe:string,[rest:string]:string}[] = []

    data.forEach((data)=>{
        let prepData : {title:string,date:string,Summe:string,[rest:string]:string}
        Object.entries(data).map(([key,value])=>{
            if (key === "Titel") {
                prepData = {...prepData, title: value as string};
            }
            else if (key.toLocaleLowerCase().includes("start")&&key.toLocaleLowerCase().includes("datum")) {
                prepData = {...prepData, date: value as string};
            }
            else {
                prepData = {...prepData, [key]: value as string};
            }
        })
        prepDataList.push(prepData!)
    })
    return (<>
            <button className='btn-nav w-full rounded-xl text-big font-semibold py-8' onClick={(e) => {
                setError("")
                setSuccess("")
                console.log(prepDataList)
                saveMultipleData(prepDataList).then((datas)=> {
                    setError(datas.error)
                    setSuccess(datas.success)
                })
                if(success!=""){
                    router.refresh()
                    onClick()
                }
            }}>Speichern</button>
            <FormError message={error}/>
            <FormSuccess message={success}/>

        </>
    )
}
