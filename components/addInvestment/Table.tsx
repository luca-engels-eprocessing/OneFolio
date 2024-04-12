"use client"
import React, { useEffect, ReactNode, ReactElement, ReactHTMLElement, useState } from 'react'

type Props = {
    items: {},
    setDisplay?: (val: boolean) => void;
    className?: string;
}

const Table = (props: Props) => {
    const [keyButtonList, setkeyButtonList] = useState<ReactNode[]>()
    const [valueButtonList, setvalueButtonList] = useState<ReactNode[]>()
    const [displayed, setDisplayed] = useState<boolean>(false)
    const [modifyableList, setModifyableList] = useState<{}>(props.items)
    const [selectionList, setselectionList] = useState<{}>({})
    
    const createValueButton = (key: string, value: any, index: number, forKey: string) => (
        <button className='btn-nav rounded-md flex flex-row justify-center gap-8 px-4 group p-2 w-full' key={index}
            onClick={() => {
                setDisplayed(false)
                if(Array.isArray(value)){
                    delete modifyableList[forKey as keyof typeof modifyableList][key];
                    var newModList = {}
                    Object.entries(modifyableList).map(([keyI, valueI]) => {
                        if (keyI === forKey) {
                            newModList = {...newModList, [key]: value}
                        }
                        newModList = {...newModList, [keyI]: valueI};
                    })
                    setModifyableList(newModList)
                    
                }
                else if(typeof value === 'string') {
                    console.log(value, " pressed for ",forKey)
                    setselectionList({ ...selectionList, [forKey]: value});
                }
                else{
                    console.log(key, " pressed for ",forKey);
                    var newModList = {}
                    Object.entries(modifyableList).map(([keyI, valueI]) => {
                        

                        if (keyI in value) {
                            delete selectionList[keyI as keyof typeof selectionList];
                            return;
                        }
                        newModList = {...newModList, [keyI]: valueI};
                        if (keyI === forKey) {
                            newModList = {...newModList, ...value};
                        }
                    })
                    setModifyableList(newModList);
                    setselectionList({ ...selectionList, [forKey]: key });
                }
            }}>
            <p className='w-full px-8 text-left 2xl:text-2xl xl:text-lg lg:text-2xl py-2'>{typeof value === 'string' ? value : key}</p>
        </button>
    );
    const createKeyButton = (key: string, value: any, index: number) => {
        return (
            <button className='btn-nav rounded-md flex flex-row justify-center gap-8 px-4 group p-2 w-full group items-end' key={index} onClick={() =>{
                setDisplayed(true)
                createValueList(key)}}>
                <p className='w-1/2 text-center py-2 2xl:text-4xl xl:text-lg lg:text-2xl h-full border-r-2 border-accentLight dark:border-accentDark group-hover:border-accentBorderLight group-focus:border-accentBorderLight dark:group-hover:border-accentBorderDark dark:group-focus:border-accentBorderDark'>{key}</p>
                <p className='w-1/2 text-left py-2 2xl:text-2xl xl:text-md lg:text-xl font-medium'>{
                    key in selectionList? selectionList[key as keyof typeof selectionList] : "..."
                }</p>
            </button>
        );
    }
    const createAddButton = (node:string) => {
        console.log(node)
        return (
            <form className='btn-nav rounded-md flex flex-col justify-center gap-8 px-4 group p-2 w-full' onSubmit={(e) => {
                e.preventDefault();

            }}>
                <input type='text' className='w-full px-8 text-left text-3xl text-accent py-2 border-0 btn-nav focus:text-textLight focus:dark:text-textDark' placeholder='Gruppe hinzufügen ...' />
                <input type='text' className='w-full px-8 text-left text-3xl text-accent py-2 border-0 btn-nav focus:text-textLight focus:dark:text-textDark' placeholder='Untergruppe hinzufügen ...' />
            </form>
        );
    }

    const createValueList = (node: string) => {
        console.log(displayed)
        var buttons :ReactNode[] = []
        {Object.entries(modifyableList[node as keyof typeof modifyableList]).map(([key, value], index) => {
            buttons.push(createValueButton(key, value, index, node))
        })}
        buttons.push(createAddButton(node))
        setvalueButtonList(buttons)
        setDisplayed(true)
    }
    
    useEffect(() => {
        var buttons :ReactNode[] = []
        {Object.entries(modifyableList).map(([key, value], index) => {
            buttons.push(createKeyButton(key, value, index))
        })}
        setkeyButtonList(buttons)
    }, [selectionList,modifyableList])
    
    
    
    return (
        <div className='flex xl:flex-row flex-col gap-8 overflow-hidden h-full'>
                <div className={  (displayed && " max-h-[50%]") + " flex-col flex gap-2 bg-sec border-def p-4 overflow-y-scroll scroll-light dark:scroll-dark rounded-md xl:w-1/2 items-center xl:max-h-full xl:h-fit "+" "+props.className}>
                    {keyButtonList}
                </div>
                {displayed && 
                    <div className={"flex-col flex gap-2 bg-sec border-def p-4 overflow-y-scroll scroll-light dark:scroll-dark rounded-md xl:w-1/2 items-center xl:max-h-full xl:h-fit h-fit max-h-[50%]"+" "+props.className}>
                        {valueButtonList}
                    </div>
                }
        </div>
    )
}

export default Table