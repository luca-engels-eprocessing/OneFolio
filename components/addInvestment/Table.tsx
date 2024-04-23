"use client"
import React, { useEffect, ReactNode, ReactElement, ReactHTMLElement, useState } from 'react'
import { IconPlus } from '@tabler/icons-react'
import { arrayBuffer } from 'stream/consumers';
import { ValueOf } from 'next/dist/shared/lib/constants';
import { M_PLUS_1 } from 'next/font/google';

type Props = {
    items: {},
    setDisplay?: (val: boolean) => void;
    className?: string;
}


// TODO Return correct strng

// MAYBE BUILD THIS FROM GROUND UP AGAIN
const findListInObject = (toFind: {},iterate: {}) => {
    var log = {}
    for(var i = 0; i < Object.keys(iterate).length; i++){
        const key = Object.keys(iterate)[i]
        const value = iterate[key as keyof typeof iterate]
        console.log(value)
        if(Array.isArray(value) && JSON.stringify({[key]:value}) === JSON.stringify(toFind)) {
            log = {[key]:value}
            console.log("found",log)
            return log
        }   
        if(value !=null&& typeof value === 'object'){
            console.log(key,value,i)
            var ret = {}
            for(var j =0; j < Object.keys(value).length; j++){
                if(typeof value[j] != "string"){
                    const val = Object.keys(value[j])
                    for(var k = 0; k < val.length; k++){
                        console.log(1.1,value[j],value[j][val[k]],val[k],k)
                        ret = findListInObject(toFind,value[j][val[k]])
                    }
                }
            }
            if(Object.keys(ret).length !== 0){
                log = {...log,[key as string]:ret}
            }
        }
    }
    return log
}


const Table = (props: Props) => {
    const [keyButtonList, setkeyButtonList] = useState<ReactNode[]>()
    const [valueButtonList, setvalueButtonList] = useState<ReactNode[]>()
    const [displayed, setDisplayed] = useState<boolean>(false)
    const [modifyableList, setModifyableList] = useState<{}>(props.items)
    const [selectionList, setselectionList] = useState<{}>({})


    const createValueButton = (key: string, index: number, forKey: string) => (
        <button className='btn-nav rounded-md flex flex-row justify-center gap-8 px-4 group p-2 w-full' key={index}
            onClick={(e)=>{
                setDisplayed(false)
                if("Mehr..." == forKey){
                    const valueName=Object.keys(key)[0];
                    const array = modifyableList[forKey as keyof typeof modifyableList] as string[]
                    const index = array.indexOf(key)
                    if(index !== -1){
                        array.splice(index,1)
                    }
                    var newModList = {}
                    
                    Object.entries(modifyableList).map(([keyI, valueI]) => {
                        if(keyI === forKey){
                            newModList = {...newModList,...key[valueName as keyof typeof key] as {}}
                        }
                        newModList = {...newModList, [keyI]: valueI};
                    })
                    setModifyableList(newModList)
                }
                else if(typeof key != 'object') {
                    console.log({[forKey]: key})
                    setselectionList({ ...selectionList, [forKey]: key});
                }
                else{
                    const valueName=Object.keys(key)[0];
                    var newModList = {}
                    if(Object.keys(key[valueName])[0] in selectionList){
                        console.log("HERE",Object.keys(key[valueName])[0])
                        delete selectionList[Object.keys(key[valueName])[0] as keyof typeof selectionList]
                    }
                    Object.entries(modifyableList).map(([keyI, valueI]) => {
                        if(keyI in newModList){
                        }
                        else{
                            newModList = {...newModList, [keyI]: valueI};
                            if(keyI === forKey){
                                newModList = {...newModList,...key[valueName] as {}}
                            }
                        }
                    })
                    setModifyableList(newModList)
                    setselectionList({ ...selectionList, [forKey]: valueName });
                }
            }}>
            <p className='w-full px-8 text-left 2xl:text-2xl xl:text-lg lg:text-2xl py-2'>{typeof key === 'object' ? Object.keys(key)[0] : key}</p>
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
            <form className='btn-nav rounded-md flex flex-col justify-center gap-8 px-4 group p-2 w-full' onSubmit={(e) => {handleAddButtonSubmit(e,node)}}>
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
    

    const handleAddButtonSubmit = (e:any,node:string) => {
        e.preventDefault();
        const newCat = (e.target as HTMLFormElement)['newCategory'].value;
        const subCat = (e.target as HTMLFormElement)['subCategory'].value;

        console.log(1,newCat)
        console.log(2,subCat)
        console.log(3,node)

        if(!subCat){
            const curr = {[node]:modifyableList[node as keyof typeof modifyableList] as []}
            //iterate and check if curr is in modyfiableList
            const listKeyValue = findListInObject(curr,modifyableList)
            console.log(4,curr)
            console.log(5,listKeyValue)
            if(listKeyValue){
                setModifyableList({...modifyableList, ...listKeyValue})
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
    }

    const createValueList = (node: string) => {
        console.log(displayed)
        var buttons :ReactNode[] = []
        console.log(modifyableList[node as keyof typeof modifyableList])
        for(var i = 0; i < Object.keys(modifyableList[node as keyof typeof modifyableList]).length; i++){
            const buttonName = modifyableList[node as keyof typeof modifyableList][i]
            console.log()
            buttons.push(createValueButton(buttonName, i, node))
        }
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