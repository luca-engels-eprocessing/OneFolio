"use client"
import React, { useEffect, ReactNode, ReactElement, ReactHTMLElement, useState } from 'react'
import { IconPlus } from '@tabler/icons-react'

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
                if("Mehr..." == forKey){
                    delete modifyableList[forKey as keyof typeof modifyableList][key];
                    var newModList = {}
                    Object.entries(modifyableList).map(([keyI, valueI]) => {
                        if (keyI === forKey) {
                            newModList = {...newModList, ...value}
                        }
                        newModList = {...newModList, [keyI]: valueI};
                    })
                    setModifyableList(newModList)
                }
                else if(typeof value === 'string') {
                    setselectionList({ ...selectionList, [forKey]: value});
                }
                else{
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
    // * FIX BUT 
    // ! CHANGE THE mehr... Button to add correct. CURR NOT WORKING
    // TODO Sub of Sub category not working (Also do not implement)
    const createAddButton = (node:string) => {
        return (
            <form className='btn-nav rounded-md flex flex-col justify-center gap-8 px-4 group p-2 w-full' onSubmit={(e) => {
                e.preventDefault();
                const newCat = (e.target as HTMLFormElement)['newCategory'].value;
                const subCat = (e.target as HTMLFormElement)['subCategory'].value;
                if(!subCat){
                    const curr = modifyableList[node as keyof typeof modifyableList]
                    var valueOfKey = ""
                    var keyOfKey = ""
                    //iterate and check if curr is in modyfiableList
                    Object.entries(modifyableList).map(([key, value]) => {
                        if(!Array.isArray(value)&&value != null &&typeof value === 'object'){
                            Object.entries(value).map(([keyI, valueI]) => {
                                if(valueI[node]&&valueI[node]==curr){
                                    valueOfKey = keyI
                                    keyOfKey = key
                                }

                            })
                        }
                    })
                    if(valueOfKey){
                        const list = [...modifyableList[keyOfKey as keyof typeof modifyableList][valueOfKey][node], newCat]
                        const listKey = {...modifyableList[keyOfKey as keyof typeof modifyableList] as {}, [node]: list}
                        const valueKey = {...modifyableList[keyOfKey as keyof typeof modifyableList] as {},[valueOfKey]: listKey}

                        const list2 = [...curr, newCat]
                        setModifyableList({...modifyableList, [node]: list, [keyOfKey]:valueKey})
                    }
                    else if(Array.isArray(curr)){
                        const list = [...curr, newCat]
                        setModifyableList({...modifyableList, [node]: list})
                    }
                    else{
                        const l = Object.keys(curr).length
                        setModifyableList({...modifyableList, [node]: {...modifyableList[node as keyof typeof modifyableList] as {},...{[l]:newCat}}})
                    }
                }
                else{
                    const newCate = {[newCat]: {[subCat]:[]}}
                    const curr = modifyableList[node as keyof typeof modifyableList] as {}
                    const item = {[node]: {...curr, ...newCate}}
                    setModifyableList({...modifyableList, ...item})
                }
                setDisplayed(false)
                setselectionList({...selectionList, [node]: newCat})

            }}>
                <input type='text' className='w-full px-8 text-left text-3xl py-2 border-0 bg-transparent' name='newCategory' placeholder='Hinzufügen ...' />
                <input type='text' className='w-full px-8 text-left text-3xl py-2 border-0 bg-transparent' name='subCategory' placeholder='Untergruppe? ...' />
                <div className='flex flex-row text-3xl gap-8 items-center '>
                    <button type='submit'>
                        <IconPlus size={32} />
                    </button>
                </div>
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
        console.log("useEffect")
        var buttons :ReactNode[] = []
        {Object.entries(modifyableList).map(([key, value], index) => {
            buttons.push(createKeyButton(key, value, index))
        })}
        setkeyButtonList(buttons)
        return
    }, [selectionList,modifyableList])
    
    
    
    return (
        <div className='flex xl:flex-row flex-col gap-8 overflow-hidden h-full'>
                <div className={  (displayed && " max-h-[calc(50%-32px)]") + " flex-col flex gap-2 bg-sec border-def p-4 overflow-y-scroll scroll-light dark:scroll-dark rounded-md xl:w-[calc(50%-32px)] items-center xl:max-h-full xl:h-fit "+" "+props.className}>
                    {keyButtonList}
                    <button onClick={() => {
                        console.log(modifyableList)
                        console.log(selectionList)
                    }}>SAVE</button>
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