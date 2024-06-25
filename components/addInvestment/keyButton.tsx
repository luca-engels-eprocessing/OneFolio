import React from "react";
import { IconTrash ,IconTrashOff } from '@tabler/icons-react'
import { cn } from "@/lib/utils";
export const KeyButton = ({onClick,deleteItem,name:key, index,selecList}:{onClick:()=>void,deleteItem:(arg0: string)=>void,name:string, index: number,selecList:{}}) => {
    return (
        <div className="btn-nav w-full flex flex-row rounded-md group " key={index} >
            <button className='flex flex-row justify-center gap-8 px-4 p-2 h-full w-full items-end'onClick={onClick}>
                <p className='w-1/2 text-center py-2 text-giant h-full border-r-2 border-accentLight dark:border-accentDark group-hover:border-accentBorderLight group-focus:border-accentBorderLight dark:group-hover:border-accentBorderDark dark:group-focus:border-accentBorderDark'>{key}</p>
                <p className={cn("w-1/2 text-left py-2 font-black xl:text-2xl lg:text-lg text-base",(!(key in selecList)&&(key!="Mehr...")&&"text-destructive"))}>{
                    key in selecList? selecList[key as keyof typeof selecList] : "..."
                }</p>
            </button>
            {key!="Titel"&&key!="Mehr..."?
            <button name="delete" className='btn-delete rounded-md text-secLight hover:text-accentBorderLight/90 dark:text-secDark dark:hover:text-accentBorderDark/90 p-4 flex items-end' onClick={() => deleteItem(key)}>
                <IconTrash />
            </button>:
            <button className='btn-delete rounded-md text-secLight/75 dark:text-secDark/50 p-4 flex items-end'>
                <IconTrashOff />
            </button>
            }
        </div>
    );
}