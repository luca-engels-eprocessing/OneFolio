
import { IconPlus } from '@tabler/icons-react'
import { Button } from '../ui/button';
import React , { FormEvent, RefObject, useRef} from "react";

export const AddButton = ({onSubmit,inputType}:{onSubmit:(e:FormEvent<HTMLFormElement>)=>void,inputType?:string}) => {
    const expandDivRef: RefObject<HTMLDivElement> = useRef(null); 
    const textParRef:RefObject<HTMLParagraphElement> = useRef(null);
    
    const onClickExpand = () => {
        if(expandDivRef.current && textParRef.current){
            if(expandDivRef.current.classList.toggle("expanded")){
                expandDivRef.current.classList.remove("hidden")
                textParRef.current.textContent = "Einklappen..."
            }
            else{
                expandDivRef.current.classList.add("hidden")
                textParRef.current.textContent = "Erweitern..."
            }
        }
    }


    return (
        <form className='border-def bg-prim rounded-md flex flex-col justify-center px-4 group p-2 w-full' onSubmit={onSubmit}>
            <div className="flex-row flex gap-4">
                <input type={(inputType)?inputType:'text'} className='w-full text-left text-3xl p-2 border-0 bg-transparent' name='newCategory' placeholder='Hinzufügen ...' />
                <div className='flex flex-row text-3xl gap-8 items-center '>
                    <button type='submit' className='btn-nav p-4 rounded-lg flex flex-row justify-center gap-2 content-center'>
                        <p className="text-md">Hinzufügen</p> <IconPlus size={32} />
                    </button>
                </div>
            </div>
            <div className='hidden' ref={expandDivRef!}>
                <div className='flex flex-row justify-start content-bottom' >
                    <input type='text' className='w-full text-left text-3xl p-2 border-0 bg-transparent' name='subCategory' placeholder='Untergruppe? ...' />
                    <select name="inputType" id="inputType" className='bg-prim'>
                        <option value="text">Text</option>
                        <option value="number">Nummer</option>
                        <option value="date">Datum</option>
                    </select>
                </div>
            </div>
            <Button onClick={onClickExpand} className='cursor-pointer justify-start' variant={"link"} size={"sm"} asChild>
                <p ref={textParRef!}>Erweitert...</p>
            </Button>
        </form>
    );
}