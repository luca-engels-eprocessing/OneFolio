import React from "react";


export const ValueButton = ({onClick,index:index,name:key}:{onClick:()=>void,index:number,name:string|{}}) => {
    const str = typeof key === 'object' ? Object.keys(key)[0] : key as string
    return (
        <button className='btn-nav rounded-md flex flex-row justify-center gap-8 px-4 group p-2 w-full' key={index}
            onClick={onClick}>
            <p className='w-full px-8 text-left 2xl:text-2xl xl:text-lg lg:text-2xl py-2'>{str}</p>
        </button>
    );
}