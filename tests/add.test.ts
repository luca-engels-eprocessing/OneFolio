import {describe, expect,test} from '@jest/globals';
import {editObject,deleteFromSelection, ValueButton, KeyButton, AddButton} from '@/components/addInvestment/Table'
import React from 'react';



const getSample = () => {
    return {
        "Title": ["TEST"],
        "0":[],
        "1":[],
        "C1":["D1","E1"],
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
}




describe('Check edit Object', () => {
    const sample = getSample()
    
    const expected: { [key: string]: any[] } = sample
    test('should add empty list', () => {
        const result = editObject({"1": []}, sample, ["Test"])
        expected["1"] = ["Test"]
        expect(result).toEqual(expected)
    });
    test('should add list with one or more element', () => {
        const result = editObject({"Title": ["TEST"]}, sample, ["NEW"])
        expected["Title"] = ["TEST","NEW"]
        expect(result).toEqual(expected)
    });
    test('should add list of subelements', () => {
        const result = editObject({"C": ["D","E"]}, sample, ["NEW"])
        expected["A"] = [{"B": {"C": ["D","E","NEW"]}}]
        expect(result).toEqual(expected)
    });
    test('should add list of subelements and elements', () => {
        const result = editObject({"C1": ["D1","E1"]}, sample, ["NEW"])
        expected["A1"] = [{"B1": {"C1": ["D1","E1","NEW"]}},{"B2": {"C2": ["D2","E2"],"C3": ["D3","E3"]}}]
        expected["C1"] = ["D1","E1","NEW"]
        expect(result).toEqual(expected)
    });
});

describe('Check delete from Selection',() => {
    const sample = getSample()

    test('should delete subelement from selected elements', () => {
        deleteFromSelection("A1",sample,{"A1":"B1"})
        const expected={
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
        expect(sample).toEqual(expected)
    });
});

describe('Check Value Button',()=>{
    test('ValueButton with Object as Name',()=> {
        const result = ValueButton({ onClick: () => {}, index:1, name: {"Name":[]} });
        expect(result.props.children.props.children).toEqual("Name")
        expect(result.key).toEqual("1")
        expect(result.props.onClick.toString()).toEqual((()=>{}).toString())
    })
    test('ValueButton with String as Name',()=> {
        const result = ValueButton({ onClick: () => {}, index:1, name: "Name" });
        expect(result.props.children.props.children).toEqual("Name")
        expect(result.key).toEqual("1")
        expect(result.props.onClick.toString()).toEqual((()=>{}).toString())
    })
})


describe('Check Key Button',()=>{
    test('KeyButton with no SelList',()=> {
        const result = KeyButton({ onClick: () => {}, index:1, name: "Name",selecList: {}})
        expect(result.props.children[0].props.children).toEqual("Name")
        expect(result.props.children[1].props.children).toEqual("...")
        expect(result.key).toEqual("1")
        expect(result.props.onClick.toString()).toEqual((()=>{}).toString())
    })
    test('KeyButton with SelList',()=> {
        const result = KeyButton({ onClick: () => {}, index:1, name: "Name",selecList: {"Name":"Test"}})
        expect(result.props.children[0].props.children).toEqual("Name")
        expect(result.props.children[1].props.children).toEqual("Test")
        expect(result.key).toEqual("1")
        expect(result.props.onClick.toString()).toEqual((()=>{}).toString())
    })
})

describe('Check Add Button',()=>{
    test('AddButton correct OnClick',()=>{
        const result = AddButton({ onClick: () => {} })
        expect(result.props.onSubmit.toString()).toEqual((()=>{}).toString())
    })
})