"use client"
import React, { useEffect, ReactNode, ReactElement, ReactHTMLElement, useState } from 'react'
import { IconPlus } from '@tabler/icons-react'

type Props = {
    items: {},
    className?: string;
}


// * Uses an object to find and changes the value of the object to the to Add array. The iterate object is the list that the toFind Object belongs to. The comments in the function show the current state and the variables that are at each position...
//! JUST WORKS :D
export const editObject = (toFind: {}, iterate: {},toAdd:any[]) => {

    // iterate = {Branche: []} || {Laufzeit: []} || {Title: []}
    var fullNewList = {}

    for (var i =0; i < Object.keys(iterate).length; i++){
        const key = Object.keys(iterate)[i]
        const value = iterate[key as keyof typeof iterate] as []
        //Branche : [{},{},{},{}] || Laufzeit : [1,2,3,4,5] || Title : []
        if(JSON.stringify({[key]:value}) === JSON.stringify(toFind)){
            fullNewList = {...fullNewList,[key]:[...value, ...toAdd]}
        }
        else if(value.length > 0){
            var newList:any[] = []
            for(var j = 0; j < value.length; j++){
                // value[j] = {Energie:{}} || value[j] = 1
                if (typeof value[j] == typeof {}) {
                    for (var k = 0; k < Object.keys(value[j]).length; k++) {
                        // Object.keys(value[j])[k] = Energie
                        // value[j][Object.keys(value[j])[k]] = {Sparte: []}}
                        const obj = editObject(toFind, value[j][Object.keys(value[j])[k]], toAdd)
                        newList = [...newList, {[(Object.keys(value[j])[k])]:obj}]
                    }
                } else {
                    newList = [...newList, value[j]]
                }
            }
            fullNewList = {...fullNewList,[key]:newList}
        }
        else{
            fullNewList = {...fullNewList,[key]:value}
        }
    }
    return fullNewList
}

export const deleteFromSelection = (toDelete: {}, modList: {}, selList: {}) => {
    
    console.log("HERE",toDelete)
    const one = modList[toDelete as keyof typeof modList] as []
    const two = selList[toDelete as keyof typeof selList]
    console.log("HERE 1",one , two)
    var index = 0;
    one.map((value) => {
        if(Object.keys(value)[0] === two){
            index = one.indexOf(value)
        }

    })
    const c = modList[toDelete as keyof typeof modList][index][two]
    if(c){
        Object.keys(c).map((value) => {
            delete modList[value as keyof typeof modList]
        })
    }

}

const Table = (props: Props) => {
    const [keyButtonList, setkeyButtonList] = useState<ReactNode[]>()
    const [valueButtonList, setvalueButtonList] = useState<ReactNode[]>()
    const [displayed, setDisplayed] = useState<boolean>(false)
    const [selectionList, setselectionList] = useState<{}>({})
    const [modifyableList, setModifyableList] = useState<{}>(props.items)

    const KeyButton = ({name:key, index}:{name:string, index: number}) => {
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

    const ValueButton = ({name:key, index, forKey}:{name: string, index: number, forKey: string}) => {
        return (
            <button className='btn-nav rounded-md flex flex-row justify-center gap-8 px-4 group p-2 w-full' key={index}
                onClick={() => onClickValueButton(key, index, forKey)}>
                <p className='w-full px-8 text-left 2xl:text-2xl xl:text-lg lg:text-2xl py-2'>{typeof key === 'object' ? Object.keys(key)[0] : key}</p>
            </button>
        );
    }

    const AddButton = ({node}:{node:string}) => {
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
    
    //TODO Clear modyfiableList of subelements (found twice in the list)
    const onClickValueButton = (key:string,index:number,forKey:string)  => {
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
            deleteFromSelection(forKey,modifyableList,selectionList)
            if(Object.keys(key[valueName])[0] in selectionList){
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
    }
    
    //TODO FIX ADDING SUBGROUP doesnt delete current selected
    const handleAddButtonSubmit = (e:any,node:string) => {
        e.preventDefault();
        console.log("HEREwcqdf",node)
        deleteFromSelection(node,modifyableList,selectionList)
        const newCat = (e.target as HTMLFormElement)['newCategory'].value as string;
        const subCat = (e.target as HTMLFormElement)['subCategory'].value;
        if(!subCat){
            const curr = { [node]: modifyableList[node as keyof typeof modifyableList] as {} };
            //iterate and check if curr is in modyfiableList
            const listKeyValue = editObject(curr, modifyableList, [newCat]);
            setModifyableList(listKeyValue)
        }
        else{
            const newCatSub = {[newCat]: {[subCat]:[]}}
            const curr = { [node]: modifyableList[node as keyof typeof modifyableList] as {} };
            const listKeyValue = editObject(curr, modifyableList, [newCatSub]);
            setModifyableList({...listKeyValue, [subCat]: []})
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
            // buttons.push(createValueButton(buttonName, i, node))
            buttons.push(<ValueButton key={i} index={i} forKey={node} name={buttonName} />)
        }
        buttons.push(<AddButton node={node} key={"-1"} />)
        setvalueButtonList(buttons)
        setDisplayed(true)
    }
    
    useEffect(() => {
        console.log("useEffect")
        var buttons :ReactNode[] = []
        {Object.entries(modifyableList).map(([key], index) => {
            buttons.push(<KeyButton name={key} index={index} key={index} />)
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