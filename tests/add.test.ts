import {describe, expect,test} from '@jest/globals';
import {editObject} from '@/components/addInvestment/Table'



const sample = {
    "Title": ["TEST"],
    "0":[],
    "1":[],
    "A":[{
        "B":{
            "C":[
                "D","E"
            ]
        }
    }],
    "A1":[{
        "B1":{
            "C1":[
                "D1","E1"
            ]
        },
    },{
        "B2":{
            "C2":[
                "D2","E2"
            ],
            "C3":[
                "D3","E3"
            ]
        },
    }]
}

const expected: { [key: string]: any[] } = sample

describe('Check fill Table', () => {
            test('should fill empty list', () => {
                const result = editObject({"1": []}, sample, ["Test"])
                expected["1"] = ["Test"]
                expect(result).toEqual(expected)
            });
            test('should fill list with one or more element', () => {
                const result = editObject({"Title": ["TEST"]}, sample, ["NEW"])
                expected["Title"] = ["TEST","NEW"]
                expect(result).toEqual(expected)
            });
            test('should fill list of subelements', () => {
                const result = editObject({"C": ["D","E"]}, sample, ["NEW"])
                expected["A"] = [{"B": {"C": ["D","E","NEW"]}}]
                expect(result).toEqual(expected)
            });
            test('should fill list of subelements with multiple elements', () => {
                const result = editObject({"C1": ["D1","E1"]}, sample, ["NEW"])
                expected["A1"] = [{"B1": {"C1": ["D1","E1","NEW"]}},{"B2": {"C2": ["D2","E2"],"C3": ["D3","E3"]}}]
                console.log(expected,result)
                expect(result).toEqual(expected)
            });


        });
