const createList = (values:{}, listType:any,) => {
    switch(typeof listType){
        case 'number':
            break
        case 'boolean':
            break
        case 'string':
            break
        case 'object':
            break
    }
}


const valueButtonOnClick = () => {
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
}
