import {describe, expect,test,jest} from '@jest/globals';
import {editObject,deleteFromSelection} from '@/components/addInvestment/Table'
import { AddButton } from '@/components/addInvestment/addCategoryButton';
import { render, fireEvent, act } from '@testing-library/react';
import { SaveButton } from '@/components/addInvestment/saveInvestmentButton';
import { auth } from '@/auth';
import { afterEach } from 'node:test';
import { ValueButton } from '@/components/addInvestment/valueButton';
import { KeyButton } from '@/components/addInvestment/keyButton';
import { saveData } from '@/utils/saveInvestment';

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
        const { getByText, } = render(<KeyButton onClick={()=>{}} deleteItem={()=>{}} index={1} name="Name" selecList={{}} />)
        const result = KeyButton({ onClick: () => {}, deleteItem: () => {}, index:1, name: "Name", selecList: {}})
        expect(getByText("Name")).toBeTruthy()
        expect(getByText("...")).toBeTruthy()
        console.log(result)
        expect(result.key).toEqual("1")
        expect(result.props.children[0].props.onClick.toString()).toEqual((()=>{}).toString())
    })
    test('KeyButton with SelList',()=> {
        const { getByText, } = render(<KeyButton onClick={()=>{}} deleteItem={()=>{}} index={1} name="Name" selecList={{"Name":"Test"}} />)
        const result = KeyButton({ onClick: () => {}, deleteItem: () => {}, index:1, name: "Name",selecList: {"Name":"Test"}})
        expect(getByText("Name")).toBeTruthy()
        expect(getByText("Test")).toBeTruthy()
        expect(result.key).toEqual("1")
        expect(result.props.children[0].props.onClick.toString()).toEqual((()=>{}).toString())
    })
    test('KeyButton onClick function', () => {
        const mockOnClick = jest.fn();
        const { getByText } = render(<KeyButton onClick={mockOnClick} deleteItem={() => {}} index={1} name="Test Button" selecList={{}} />);
        const button = getByText('Test Button');
        fireEvent.click(button);
        expect(mockOnClick).toHaveBeenCalled();
    });
})

describe('Check Add Button',()=>{
    test('AddButton correct OnClick', () => {
        const { getByText } = render(<AddButton onSubmit={() => {}} inputType='text' />);
        const button = getByText('Hinzufügen'); // Replace 'Button Text' with the actual text or identifier on the button
        expect(button).toBeTruthy();
    });
    test('AddButton correct OnClick', () => {
        const { getByText } = render(<AddButton onSubmit={() => {}} inputType='text' />);
        const button = getByText('Hinzufügen'); // Replace 'Button Text' with the actual text or identifier on the button
        expect(button).toBeTruthy();
    });
    test('AddButton expand functionality',async () => {
        const { getByText } = render(<AddButton onSubmit={() => {}} />);
        const expandButton = getByText('Erweitert...');
        await act(async() => {
          fireEvent.click(expandButton);
        });
        
        const expandedDiv = document.querySelector('.expanded');
        const hiddenDiv = document.querySelector('.hidden');
        
        expect(expandedDiv).not.toBeNull();
        expect(hiddenDiv).toBeNull();
        expect(expandButton.textContent).toEqual('Einklappen...');
        await act(async() => {
          fireEvent.click(expandButton);
        });

        const collapsedDiv = document.querySelector('.hidden');
        expect(collapsedDiv).not.toBeNull();
        expect(expandButton.textContent).toEqual('Erweitern...');
    });
    test('AddButton input type text', () => {
        const { getByPlaceholderText } = render(<AddButton onSubmit={() => {}} inputType='text' />);
        const input = getByPlaceholderText('Wert hinzufügen ...');
        expect(input.getAttribute('type')).toEqual('text');
    });

    test('AddButton input type number', () => {
        const { getByPlaceholderText } = render(<AddButton onSubmit={() => {}} inputType='number' />);
        const input = getByPlaceholderText('Wert hinzufügen ...');
        expect(input.getAttribute('type')).toEqual('number');
    });

    test('AddButton input type date', () => {
        const { getByPlaceholderText } = render(<AddButton onSubmit={() => {}} inputType='date' />);
        const input = getByPlaceholderText('Wert hinzufügen ...');
        expect(input.getAttribute('type')).toEqual('date');
    });
})

describe('SaveInvestmentButton', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

    const mockData = { title: 'Test Investment', date: '2023-01-01', data: { data: "Test" } }
    test('SaveButton renders correctly', () => {
        const { getByText } = render(<SaveButton data={{}} onClick={() => {}} />);
        const button = getByText('Speichern');
        expect(button).toBeTruthy();
    });

    test('SaveButton displays error message on failed save', async () => {
        const errorMessage = "Bitte füge einen Titel für dein Investment ein";
        const { getByText } = render(<SaveButton data={{}} onClick={() => {}} />);
        const button = getByText('Speichern');
        await act(async () => {
            fireEvent.click(button);
        });
        const errorDisplay = await getByText(errorMessage, { exact: false })
        expect(errorDisplay).toBeTruthy();
    });

    test('SaveButton displays success message on successful save', async () => {
        const successMessage = "Investment erfolgreich gespeichert!";
        const { getByText } = render(<SaveButton data={{"Titel": "Test","Startdatum des Investments":"2023-01-01","Daten": "Test","Daten2": "Test"}} onClick={() => {}} />);
        const button = getByText('Speichern');
        const mockSession = {
            expires: new Date(Date.now() + 2 * 86400).toISOString(),
            user: { id: "1" }
        };
        (auth as jest.Mock).mockReturnValue(mockSession); // Mocking auth to return the session data and authenticated status
        await act(async () => {
            fireEvent.click(button);
        });
        const successDisplay = await getByText(successMessage, { exact: false })
        expect(successDisplay).toBeTruthy();
    });

    test('SaveButton displays error if no UserID', async () => {
        const errorMessage = "Es gab einen Fehler beim laden der Nutzerdaten";
        const { getByText } = render(<SaveButton data={{"Titel": "Test","Startdatum des Investments":"2023-01-01","Daten": "Test","Daten2": "Test"}} onClick={() => {}} />);
        const button = getByText('Speichern');
        const mockSession = {
            expires: new Date(Date.now() + 2 * 86400).toISOString(),
            user: {}
        };
        (auth as jest.Mock).mockReturnValue(mockSession); // Mocking auth to return the session data and authenticated status
        await act(async () => {
            fireEvent.click(button);
        });
        const errorDisplay = await getByText(errorMessage, { exact: false })
        expect(errorDisplay).toBeTruthy();
    });
    
});

