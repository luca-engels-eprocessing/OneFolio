import {describe, expect,test,jest} from '@jest/globals';
import { MarketChart, createPatternArray, generateGradientHexList, getIndexFromKey } from '@/components/chart';
import { render, waitFor } from '@testing-library/react';



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
});





describe('Check Gradient calculation', () => {
    jest.mock('react-chartjs-2', () => ({
        Bar: () => null,
        Pie: () => null,
      }));
    test('should render the list with sum', () => {
        const data:{[key:string]:string}[] = [{Data:"Test",Data2:"Test",Summe:"300"},{Data:"TESTING",Data2:"MORE STUFF",Summe:"600"},{Data2:"MORE STUFF",Summe:"600"},{Data:"TEST",Data2:"Stuff"},{Data:"TEST",Summe:"300"},{"Data":"TEST"},{"Data2":"Stuff"},{"Summe":"300"}]
        const {getByText} = render(<MarketChart data={data} type={'bar'} forKey={'sum'}/>)
        // wait for useEffect to complete befor getting text
        waitFor(() => {
            const text = getByText("Deine Investitionssummen");
            expect(text).toBeTruthy();
        });
    });
    test('should render the list with return', () => {

        const data:{[key:string]:string}[] = [{Data:"Test",Data2:"Test",Summe:"300"},{Data:"TESTING",Data2:"MORE STUFF",Summe:"600"},{Data2:"MORE STUFF",Summe:"600"},{Data:"TEST",Data2:"Stuff"},{Data:"TEST",Summe:"300"},{"Data":"TEST"},{"Data2":"Stuff"},{"Summe":"300"}]
        const {getByText} = render(<MarketChart data={data} type={'bar'} forKey={'ret'}/>)
        // wait for useEffect to complete befor getting text
        waitFor(() => {
            const text = getByText("Deine Durchschnitsrendite");
            expect(text).toBeTruthy();
        });
    });
    test('should render the list with risk', () => {
        const data:{[key:string]:string}[] = [{Data:"Test",Data2:"Test",Summe:"300"},{Data:"TESTING",Data2:"MORE STUFF",Summe:"600"},{Data2:"MORE STUFF",Summe:"600"},{Data:"TEST",Data2:"Stuff"},{Data:"TEST",Summe:"300"},{"Data":"TEST"},{"Data2":"Stuff"},{"Summe":"300"}]
        const {getByText} = render(<MarketChart data={data} type={'bar'} forKey={'sum'}/>)
        // wait for useEffect to complete befor getting text
        waitFor(() => {
            const text = getByText("Deine Risikoklassenverteilung");
            expect(text).toBeTruthy();
        });
    });
});