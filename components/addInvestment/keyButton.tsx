import React from "react";
export const KeyButton = ({onClick,name:key, index,selecList}:{onClick:()=>void,name:string, index: number,selecList:{}}) => {
    return (
        <button className='btn-nav rounded-md flex flex-row justify-center gap-8 px-4 group p-2 w-full group items-end' key={index} onClick={onClick}>
            <p className='w-1/2 text-center py-2 2xl:text-4xl xl:text-lg lg:text-2xl h-full border-r-2 border-accentLight dark:border-accentDark group-hover:border-accentBorderLight group-focus:border-accentBorderLight dark:group-hover:border-accentBorderDark dark:group-focus:border-accentBorderDark'>{key}</p>
            <p className='w-1/2 text-left py-2 2xl:text-2xl xl:text-md lg:text-xl font-medium'>{
                key in selecList? selecList[key as keyof typeof selecList] : "..."
            }</p>
        </button>
    );
}