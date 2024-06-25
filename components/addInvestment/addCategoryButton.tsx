
import { IconPlus } from '@tabler/icons-react'
import { Button } from '../ui/button';
import React , { FormEvent, RefObject, useRef} from "react";

export const AddButton = ({node,onSubmit,inputType}:{node?:string,onSubmit:(e:FormEvent<HTMLFormElement>)=>void,inputType?:string}) => {
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
            <div className="xl:flex-row flex-col flex gap-4 justify-start items-center">
                <input type={(inputType)?inputType:'text'} className='w-full text-left text-big p-2 border-0 bg-transparent text-primary-foreground' aria-label='newCategory' name='newCategory' placeholder='Wert hinzufügen ...' />
         
                {node == "Mehr..."&&
                <div className='h-full text-start flex flex-col items-start'>
                    <label className='text-small' >Als:</label>
                    <select name="inputType" id="inputType" className='bg-prim'>
                        <option value="text">Texte</option>
                        <option value="number">Nummern</option>
                        <option value="date">Daten</option>
                    </select>
                </div>
                }
                <div className='flex flex-row text-big gap-8 items-center text-center w-full xl:w-auto'>
                    <button type='submit' aria-label='add-button' className='w-full btn-nav p-4 rounded-lg flex flex-row justify-center gap-2 content-center items-center'>
                        <p className="text-medium h-full">Hinzufügen</p> <IconPlus size={32} />
                    </button>
                </div>
            </div>
            <div className='hidden' ref={expandDivRef!}>

                {node != "Titel" && node != "Mehr..." && <div className='flex gap-2 flex-row justify-start content-bottom' >
                    <input type='text' className='w-full text-left text-big p-2 border-0 bg-transparent' name='subCategory' placeholder='Sub-Kategorie ...' />    
                    <div className='text-center text-big flex flex-row justify-center items-center'>
                        <label>Als:</label>
                        <select name="inputType" id="inputType" className='bg-prim'>
                            <option value="text">Texte</option>
                            <option value="number">Nummern</option>
                            <option value="date">Daten</option>
                        </select>
                    </div>
                </div>}
            </div>
            {node != "Titel" && node != "Mehr..." && <Button onClick={onClickExpand} className='cursor-pointer justify-start' variant={"link"} size={"sm"} asChild>
                <p ref={textParRef!}>Erweitert...</p>
            </Button>}
        </form>
    );
}