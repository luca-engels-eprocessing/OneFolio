import {describe, expect,test,jest} from '@jest/globals';
import { MarketChart, generateGradientHexList } from '@/components/chart';
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
});