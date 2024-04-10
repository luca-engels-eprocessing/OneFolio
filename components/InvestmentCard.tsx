"use client"
import React, { useRef } from 'react'

type Detail = {
    [key: string]: string;
}[];


type Props = {
    title: string,
    date: string,
    details: {}
    
}

const InvestmentCard = (props: Props) => {
const expandRef = useRef<HTMLDivElement>(null);
const gridRef = useRef<HTMLDivElement>(null);

//TODO expand button height to h-96 if button is pressed

const onClickExpand = () => {
    if(gridRef.current){
        if(gridRef.current.classList.toggle("expanded")){
            gridRef.current.querySelectorAll(':nth-child(n+4):not(:last-child)').forEach((node) => {
                node.classList.remove('hidden');
            });
        }
        else{
            gridRef.current.querySelectorAll(':nth-child(n+4):not(:last-child)').forEach((node) => {
                node.classList.add('hidden');
            });
        }
        
    }
}

return (
    <div className={"btn-nav rounded-md flex flex-row gap-8 px-4 group h-full"}>
        <button onClick={onClickExpand} className={"flex flex-col justify-between w-1/2 items-end text-right h-full gap-4"}>
            <h1 className={"pt-8 text-accentLight dark:text-accentDark text-5xl font-semibold pb-8 group-hover:text-accentTextLight group-focus:text-accentTextLight dark:group-hover:text-accentTextDark dark:group:focus:text-accentTextDark"}>
                {props.title}
            </h1>
            <div className='pb-8'>
                <p className={"text-sm font-light"}>Läuft aus am:</p>
                <p className={"text-2xl font-normal"}>{props.date}</p>
            </div>
        </button>
        <div className='py-4 h-full'>
            <div
                className={"border-r-2 h-full border-accentLight dark:border-accentDark group-hover:border-accentBorderLight group-focus:border-accentBorderLight dark:group-hover:border-accentBorderDark dark:group-focus:border-accentBorderDark"}
            />
        </div>
        <div className='p-8 h-full w-1/2'>
            <div className={"grid grid-cols-2 gap-4  items-center text-start grid-rows-2 w-full"} ref={gridRef}>
                {Object.entries(props.details).slice(0, 3).map(([key, value], index) => (
                    <div key={index} className={index >= 3 ? 'hidden' : ''}>
                        <p className={"text-sm font-light"}>{key}</p>
                        <p className={"text-2xl font-normal"}>{value as string}</p>
                    </div>
                ))}
                {Object.entries(props.details).slice(3).map(([key, value], index) => (
                    <div key={index + 3} className='hidden'>
                        <p className={"text-sm font-light"}>{key}</p>
                        <p className={"text-2xl font-normal"}>{value as string}</p>
                    </div>
                ))}
                <a onClick={onClickExpand} className='cursor-pointer'>Anpassen ...</a>
            </div>
        </div>
    </div>
)
}

export default InvestmentCard