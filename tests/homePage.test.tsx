import {describe, expect,test,jest} from '@jest/globals';
import { MarketChart, createPatternArray, generateGradientHexList, getIndexFromKey, getKeyFromList, isKeyInList } from '@/components/chart';
import { render } from '@testing-library/react';



describe('Check Gradient calculation', () => {


    test('should return list of one', () => {    
        const result = generateGradientHexList("000000","ffffff",1)
        const expectedColors = ["#808080"]
        expect(result.length).toEqual(expectedColors.length)
        expect(result).toEqual(expectedColors)
    });
    test('should return list of one with alpha 80', () => {    
        const result = generateGradientHexList("000000","ffffff",1,true)
        const expectedColors = ["#80808080"]
        expect(result.length).toEqual(expectedColors.length)
        expect(result).toEqual(expectedColors)
    });
    test('should return middle', () => {    
        const result = generateGradientHexList("FFFFFF","000000",3)
        const expectedColors = ["#ffffff","#808080","#000000"]
        expect(result.length).toEqual(expectedColors.length)
        expect(result).toEqual(expectedColors)
    });
    test('should return start and end color', () => {
        const result = generateGradientHexList("FFFFFF","000000",2)
        const expectedColors = ["#ffffff","#000000"]
        expect(result).toEqual(expectedColors)
    });
    test('should return an alpha of 80', () => {
        const result = generateGradientHexList("FFFFFF","000000",2,true)
        const expectedColors = ["#ffffff80","#00000080"]
        expect(result).toEqual(expectedColors)
    });
    test('should return an empty list', () => {
        const result = generateGradientHexList("FFFFFF","000000",0)
        const expectedColors:string[] = []
        expect(result).toEqual(expectedColors)
    });
    test('checkPatternList',()=>{
        const result = createPatternArray(2,"A","B")
        const expected = ["A","B"]
        expect(result).toEqual(expected)
    })
    test('checkPatternList',()=>{
        const result = createPatternArray(3,"A","B")
        const expected = ["A","B","A"]
        expect(result).toEqual(expected)
    })
    test('Check IsKeyInList is true',()=>{
        const result = isKeyInList("A",[{key:"A",value:"B"}])
        expect(result).toBeTruthy()
    })
    test('Check IsKeyInList is false',()=>{
        const result = isKeyInList("A",[{key:"B",value:"B"}])
        expect(result).toBeFalsy()
    })
    test('Check getIndexFromKey first',()=>{
        const result = getIndexFromKey("A",[['A',123],['S',1234]])
        expect(result).toEqual(0)
    })
    test('Check getIndexFromKey secont',()=>{
        const result = getIndexFromKey("S",[['A',123],['S',1234]])
        expect(result).toEqual(1)
    })
    test('Check getIndexFromKey none',()=>{
        const result = getIndexFromKey("A",[])
        expect(result).toEqual(-1)
    })
    test('Check getKeyFromList true',()=>{
        const result = getKeyFromList("A",[{key:"A",value:"B"}])
        expect(result).toEqual("B")
    })
    test('Check getKeyFromList false',()=>{
        const result = getKeyFromList("A",[{key:"B",value:"B"}])
        expect(result).toBeUndefined()
    })
});





// describe('Check Gradient calculation', () => {
//     jest.mock('react-chartjs-2', () => ({
//         Bar: () => null,
//         Pie: () => null,
//         Radar: () => null,
//       }));
//     test('should render the list', () => {
//         const data = [[{key:"Data",value:"TEST"},{key:"Data2",value:"Stuff"},{key:"Summe",value:"300"}],[{key:"Data",value:"TESTING"},{key:"Data2",value:"MORE STUFF"},{key:"Summe",value:"600"}],[{key:"Data2",value:"MORE STUFF"},{key:"Summe",value:"600"}],[{key:"Data",value:"TEST"},{key:"Data2",value:"Stuff"}],[{key:"Data",value:"TEST"},{key:"Summe",value:"300"}],[{key:"Data",value:"TEST"}],[{key:"Data2",value:"Stuff"}],[{key:"Summe",value:"300"}],[]]
//         const {getByText} = render(<MarketChart data={data} diagramKey={'Data'} type={'bar'}/>)
//         const text = getByText("Deine Data")
//         expect(text).toBeTruthy()
//     });
// });