"use client"
import { createKey } from 'next/dist/shared/lib/router/router';
import React, { useEffect, ReactNode, ReactElement, ReactHTMLElement, useState } from 'react'

type Props = {
    items: {},
    setDisplay?: (val: boolean) => void;
    className?: string;
}

const Table = (props: Props) => {
    const [keyButtonList, setkeyButtonList] = useState<ReactNode[]>()
    const [valueButtonList, setvalueButtonList] = useState<ReactNode[]>()
    const [displayed, setDisplayed] = useState<boolean>(true)
    const [modifyableList, setModifyableList] = useState<{}>(props.items)
    
    const createValueButton = (key: string, value:any, index: number) => {
        if(typeof value == 'string'){
            return (
                <button className='btn-nav rounded-md flex flex-row gap-8 px-4 group h-full w-fit' key={index} onClick={() => {console.log(value, " pressed")}}>
                    <p>{value}</p>
                </button>
            );
        }
        else{
            return (
                <button className='btn-nav rounded-md flex flex-row gap-8 px-4 group h-full w-fit' key={index} onClick={() => {
                    console.log("HERE",key)
                    var list = {...modifyableList,...value}
                    setModifyableList(list)
                }}>
                    <p>{key}</p>
                </button>
            )
        }
    }
    const createKeyButton = (key: string, value: any, index: number) => {
        return (
            <button className='btn-nav rounded-md flex flex-row gap-8 px-4 group h-full w-fit' key={index} onClick={() => createValueList(key)}>
                <p>{key}</p>
                <div className={"border-r-2 w-1 h-full border-accentLight dark:border-accentDark group-hover:border-accentBorderLight group-focus:border-accentBorderLight dark:group-hover:border-accentBorderDark dark:group-focus:border-accentBorderDark"}/>
                <p>...</p>
            </button>
        );
    }

    const createValueList = (key: string) => {	
        var buttons :ReactNode[] = []
        {Object.entries(modifyableList[key as keyof typeof modifyableList]).map(([key, value], index) => {
            buttons.push(createValueButton(key, value, index))
        })}
        setvalueButtonList(buttons)
        setDisplayed(true)
    }
    
    useEffect(() => {
        console.log(modifyableList)
        var buttons :ReactNode[] = []
        {Object.entries(modifyableList).map(([key, value], index) => {
            buttons.push(createKeyButton(key, value, index))
        })}
        setkeyButtonList(buttons)
    }, [modifyableList])
    
    
    
    return (
        <div className='flex flex-row gap-4'>
            <div className={"flex-col flex gap-2 bg-sec border-def p-8 overflow-y-scroll scroll-light dark:scroll-dark rounded-md w-fit items-center "+props.className}>
                {keyButtonList}
            </div>
            {displayed && 
                <div className={"flex-col flex gap-2 bg-sec border-def p-8 overflow-y-scroll scroll-light dark:scroll-dark rounded-md w-fit items-center "+props.className}>
                    {valueButtonList}
                </div>
            }
        </div>
    )
}

export default Table