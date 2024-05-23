import React, { useState } from "react"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { saveData } from "@/utils/saveInvestment"



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
                    onClick()
                }
            }}>Speichern</button>
            <FormError message={error}/>
            <FormSuccess message={success}/>
            <input type="file" accept=".csv" onChange={handleFileUpload} />
        </>
    )
}


const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const text = e.target?.result;
            if (typeof text === 'string') {
                const data = text.split('\n').map(row => row.split(','));
                console.log('CSV Data:', data);
                // Process CSV data here or update state
            }
        };
        reader.readAsText(file);
    }
};
