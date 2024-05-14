"use client"
import React, { useEffect, ReactNode, useState} from 'react'
import { saveData } from '@/utils/saveInvestment';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { AddButton } from '@/components/addInvestment/addCategory'
import { cn } from '@/lib/utils';
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

export const deleteFromSelection = (toDelete: string, modList: {}, selList: {}) => {
    const one = modList[toDelete as keyof typeof modList] as []
    const two = selList[toDelete as keyof typeof selList]
    var index = 0;
    if(two){
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
}



export const ValueButton = ({onClick,index:index,name:key}:{onClick:()=>void,index:number,name:string|{}}) => {
    const str = typeof key === 'object' ? Object.keys(key)[0] : key as string
    return (
        <button className='btn-nav rounded-md flex flex-row justify-center gap-8 px-4 group p-2 w-full' key={index}
            onClick={onClick}>
            <p className='w-full px-8 text-left 2xl:text-2xl xl:text-lg lg:text-2xl py-2'>{str}</p>
        </button>
    );
}


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



export const SaveButton= ({data,onClick}:{data:{[key: string]:any},onClick:()=>void}) => {
    const [success, setSuccess] = useState<string|undefined>("")  
    const [error, setError] = useState<string|undefined>("")

    let prepData : {title:string,date:string,data:{}}
    Object.entries(data).map(([key,value])=>{
        if(key === "Titel"){
            prepData = {...prepData, title: value}
        }
        else if(key === "Startdatum des Investments"){
            prepData = {...prepData, date: value}
        }
        else{
            if(prepData && prepData.data){
                prepData = {...prepData, data: {...prepData.data, [key]:value}}
            }
            else{
                prepData = {...prepData, data: {[key]:value}}
            }
        }
    })

    return (<>
            <button className='btn-nav w-full rounded-xl text-xl font-semibold py-8' onClick={(e) => {
                setError("")
                setSuccess("")
                console.log(data)
                saveData(prepData).then((data)=> {
                    setError(data.error)
                    setSuccess(data.success)
                })
                onClick()
            }}>Speichern</button>
            <FormError message={error}/>
            <FormSuccess message={success}/>
        </>
    )
}

export const Table = (props: Props) => {
    const [keyButtonList, setkeyButtonList] = useState<ReactNode[]>()
    const [valueButtonList, setvalueButtonList] = useState<ReactNode[]>()
    const [displayed, setDisplayed] = useState<boolean>(false)
    const [selectionList, setselectionList] = useState<{}>({})
    const [modifyableList, setModifyableList] = useState<{}>(props.items)
    
    useEffect(() => {
        const onClickValueButton = (key:string,forKey:string)  => {
            setDisplayed(false)
            deleteFromSelection(forKey,modifyableList,selectionList)
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
                setselectionList({ ...selectionList, [forKey]: key});
            }
            else{
                const valueName=Object.keys(key)[0];
                var newModList = {}
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

        const handleAddButtonSubmit = (e:any,node:string) => {
            e.preventDefault();
            deleteFromSelection(node,modifyableList,selectionList)
            const newCat = (e.target as HTMLFormElement)['newCategory'].value as string;
            const type = e.target['inputType']?e.target['inputType'].value as string:undefined
            if(newCat == ''){
                return
            }
            const subCat = e.target["subCategory"]?e.target['subCategory'].value:undefined;
            if(node == "Mehr..."){
                setModifyableList({...modifyableList,[newCat]:[type?type:"text"]})
                return
            }
            if(!subCat){
                const curr = { [node]: modifyableList[node as keyof typeof modifyableList] as {} };
                //iterate and check if curr is in modyfiableList
                const listKeyValue = editObject(curr, modifyableList, [newCat]);
                setModifyableList(listKeyValue)
            }
            else{
                const newCatSub = {[newCat]: {[subCat]:[type?type:"text"]}}
                const curr = { [node]: modifyableList[node as keyof typeof modifyableList] as {} };
                var newList = {}
                Object.entries(editObject(curr, modifyableList, [newCatSub])).map(([key, value]) => {
                    newList = {...newList, [key]: value}
                    if(node == key){
                        newList = {...newList, [subCat]: [type?type:"text"]}
                    }
                })
                setModifyableList(newList)
            }
            setDisplayed(false)
            setselectionList({...selectionList, [node]: newCat})
        }
        
        const createValueList = (node: string) => {
            var buttons :ReactNode[] = []
            for(var i = 1; i < Object.keys(modifyableList[node as keyof typeof modifyableList]).length; i++){
                const buttonName = modifyableList[node as keyof typeof modifyableList][i]
                buttons.push(<ValueButton key={i} index={i} name={buttonName} onClick={()=>{onClickValueButton(buttonName, node)}} />)
            }
            let inputType
            if(Object.keys(modifyableList[node as keyof typeof modifyableList]).length>0){
                inputType = modifyableList[node as keyof typeof modifyableList][0]
            }
            console.log(inputType)
            buttons.push(<AddButton onClick={(e)=>{handleAddButtonSubmit(e,node)}} inputType={inputType} key={Object.keys(modifyableList[node as keyof typeof modifyableList]).length}/>)
            setvalueButtonList(buttons)
            setDisplayed(true)
        }

    
        console.log(modifyableList)
    
    //TODO Clear modyfiableList of subelements (found twice in the list)
        var buttons :ReactNode[] = []
        if(Object.keys(modifyableList).length === 0){
            setModifyableList({"Titel":['text'],"Startdatum des Investments":['date'],"Mehr...":['text']})
        }
        {Object.entries(modifyableList).map(([key], index) => {
            buttons.push(<KeyButton onClick={() =>{createValueList(key)}} name={key} index={index} key={index} selecList={selectionList} />)
        })}
        setkeyButtonList(buttons)
        return
    }, [selectionList,modifyableList])
    
    const clearList = () => {
        setselectionList({})
        setModifyableList(props.items)
        setDisplayed(false)
        setvalueButtonList([])
        setkeyButtonList([])
    }
    
    return (
        <div className=' w-[80vw] flex xl:flex-row flex-col gap-8 overflow-hidden'>
                <div className={  cn(displayed && " max-h-[calc(50%-32px)]", " flex-col flex gap-2 bg-sec border-def p-4 overflow-y-scroll scroll-light dark:scroll-dark rounded-md xl:w-[calc(50%-32px)] items-center xl:max-h-full xl:h-fit",props.className)}>
                    {keyButtonList}
                    <SaveButton data={selectionList} onClick={clearList} />
                </div>
                {displayed && 
                    <div className={cn("flex-col flex gap-2 bg-sec border-def p-4 overflow-y-scroll scroll-light dark:scroll-dark rounded-md xl:w-1/2 items-center xl:max-h-full xl:h-fit h-fit max-h-[50%]",props.className)}>
                        {valueButtonList}
                    </div>
                }
        </div>
    )
}
