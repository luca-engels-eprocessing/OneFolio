"use client"
import React, { useRef } from 'react'


type Props = {
    title: string;
    date: string;
    key1: string;
    value1: string;
    key2: string;
    value2: string;
    key3: string;
    value3: string;
    className?: string;
}

const InvestmentCard = (props: Props) => {
const expandRef = useRef<HTMLDivElement>(null);
const gridRef = useRef<HTMLDivElement>(null);

//TODO expand button height to h-96 if button is pressed

const onClickExpand = () => {
    if(expandRef.current){
        expandRef.current.classList.toggle('h-96')
    }
    if(gridRef.current){
        if(gridRef.current.classList.toggle("grid-rows-5")){
            gridRef.current.classList.remove("grid-rows-2");
        }
        else{
            gridRef.current.classList.add("grid-rows-2");
        }
        
    }
}

  return (
    <button className={"btn-nav rounded-md flex flex-row gap-8 group parent"} onClick={onClickExpand}>
        <div className={"flex flex-col justify-between w-1/2 m-8 "+props.className} ref={expandRef}>
            <h1 className={"text-accentLight dark:text-accentDark text-5xl font-semibold pb-8 group-hover:text-accentTextLight dark:group-hover:text-accentTextDark"}>{props.title}</h1>
            <div>
                <p className={"text-sm font-light"}>Läuft aus am:</p>
                <p className={"text-2xl font-normal"}>{props.date}</p>
            </div>
        </div>
        <div
          className={"border-r-2 border-accentLight dark:border-accentDark my-4"}
        />
        <div className={"grid grid-row2 gap-y-4 grid-cols-2 w-1/2 m-8 items-center"} ref={gridRef}>
            <div className='row-start-1 col-start-1'>
                <p className={"text-sm font-light"}>{props.key1}</p>
                <p className={"text-2xl font-normal"}>{props.value1}</p>
            </div>
            <div className={'row-start-1 col-start-2'} >
                <p className={"text-sm font-light"}>{props.key2}</p>
                <p className={"text-2xl font-normal"}>{props.value2}</p>
            </div>
            <div className={"row-start-2 col-start-1"}>
                <p className={"text-sm font-light"}>{props.key3}</p>
                <p className={"text-2xl font-normal"}>{props.value3}</p>
            </div>
            <p className='row-start-2 col-start-2'>Anpassen ...</p>
        </div>
    </button>
  )
}

export default InvestmentCard