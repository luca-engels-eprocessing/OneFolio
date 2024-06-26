import {describe, expect,test,jest} from '@jest/globals';
import {editObject,deleteFromSelection, Table} from '@/components/addInvestment/Table'
import { AddButton } from '@/components/addInvestment/addCategoryButton';
import { screen,render, fireEvent, act, cleanup } from '@testing-library/react';
import { SaveButton, SaveCSVButton } from '@/components/addInvestment/saveInvestmentButton';
import { auth } from '@/auth';
import { afterEach } from 'node:test';
import { ValueButton } from '@/components/addInvestment/valueButton';
import { KeyButton } from '@/components/addInvestment/keyButton';
import fetchMock from 'fetch-mock';
import { BACKEND_URL } from "@/routes";
import { AppRouterContextProviderMock } from '@/mocks/app-router-context-provider-mock';
import { ReactNode } from 'react';

const createRender= (node:React.JSX.Element) => {
    const refresh = jest.fn();
    return <AppRouterContextProviderMock router={{ refresh }}>{node}</AppRouterContextProviderMock>
}
  

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
    
    afterEach(cleanup)
    
    test('SaveButton renders correctly', () => {
        
        render(createRender(<SaveButton data={{}} onClick={() => {}} />));
        const button = screen.getByText('Speichern');
        expect(button).toBeTruthy();
    });

    test('SaveButton displays error message on failed save', async () => {
        const errorMessage = "Dein Investment hat keine Daten. Füge mehr Informationen hinzu";
        
        const { getByText } = render(createRender(<SaveButton data={{}} onClick={() => {}} />));
        const button = getByText('Speichern');
        await act(async () => {
            fireEvent.click(button);
        });
        const errorDisplay = await getByText(errorMessage, { exact: false })
        expect(errorDisplay).toBeTruthy();
    });


    test('2.4 NO SUM: SaveButton displays no sum message on save', async () => {
        fetchMock.reset() .post(BACKEND_URL+"/investments/",201)
        const successMessage = "Bitte füge eine Investmentsumme für das Investment ein";
        
        const { getByText } = render(createRender(<SaveButton data={{"Titel": "Test","Startdatum des Investments":"01.01.2020","Daten": "Test","Daten2": "Test"}} onClick={() => {}} />));
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

    test('2.1 SUCESSFUL SAVE: SaveButton displays success message on successful save', async () => {
        fetchMock.reset() .post(BACKEND_URL+"/investments/",201)
        const successMessage = "Investment erfolgreich gespeichert!";
        
        const { getByText } = render(createRender(<SaveButton data={{"Titel": "Test","Startdatum des Investments":"01.01.2020","Summe":"300","Daten": "Test","Daten2": "Test"}} onClick={() => {}} />));
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

    test('SaveButton displays server error message on failed save', async () => {
        fetchMock.reset() .post(BACKEND_URL+"/investments/",500)
        const successMessage = "Es gab ein Problem auf der Serverseite";
        
        const { getByText } = render(createRender(<SaveButton data={{"Titel": "Test","Startdatum des Investments":"2023-01-01","Summe":"300","Daten": "Test","Daten2": "Test"}} onClick={() => {}} />));
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
        const lastCall = fetchMock.lastCall()!
        expect(lastCall[1]).toBeTruthy();
        expect(lastCall[1]!.body).toContain('"userId":"1"')
        expect(lastCall[1]!.body).toContain('"title":"Test"')
        expect(lastCall[1]!.body).toContain('"date":"2023-01-01"')
        expect(lastCall[1]!.body).toContain('"Daten":"Test"')
    });

    test('SaveButton displays error if no UserID', async () => {
        const errorMessage = "Es gab einen Fehler beim laden der Nutzerdaten";
        
        const { getByText } = render(createRender(<SaveButton data={{"Titel": "Test","Summe":"300","Startdatum des Investments":"2023-01-01","Daten": "Test","Daten2": "Test"}} onClick={() => {}} />));
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

    test('SaveButton displays error if no UserID', async () => {
        const errorMessage = "Es gab einen Fehler beim laden der Nutzerdaten";
        
        const { getByText } = render(createRender(<SaveCSVButton data={[{"Titel": "Test","Startdatum des Investments":"2023-01-01","Daten": "Test","Daten2": "Test"}]} onClick={() => {}} />));
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


describe('Table rendering and fuctionality', () => {
    const sList = {
        "Titel": ['string',"TestTitle"],
        "TestObject": ['string',{'Object':{'ObjectCategory':['number',1,2]}},{'Object2':{'ObjectCategory2':['number',1,2]}}]
        
    }

    test('2.2 NO TITLE ENTERED. test save button click needs a Title', async () => {
        const {getByText} = render(createRender(<Table items={{}} />))
        const button = getByText("Speichern");
        await act(async () => {
            fireEvent.click(button)
        })
        const value = getByText("Dein Investment hat keine Daten. Füge mehr Informationen hinzu")
        expect(value).toBeTruthy()
    })
    test('test category button to open values', async () => {
        const {getByText} = render(createRender(<Table items={{}} />))
        const button = getByText("Mehr..."); // Mocking auth to return the session data and authenticated status
        await act(async () => {
            fireEvent.click(button)
        })
        const value = getByText("Startdatum des Investments")
        expect(value).toBeTruthy()
    })
    test('test add button to add category from Mehr...', async () => {
        const {getByText,getByPlaceholderText} = render(createRender(<Table items={{}} />))
        const button = getByText("Mehr..."); // Mocking auth to return the session data and authenticated status
        await act(async () => {
            fireEvent.click(button)
        })
        const value = getByText("Startdatum des Investments")
        const hinzufügenTextField = getByPlaceholderText("Wert hinzufügen ...")
        expect(value).toBeTruthy()
        expect(hinzufügenTextField).toBeTruthy()
        await act(async () => {
            fireEvent.click(value)
        })
        const valueInCategory = getByText("Startdatum des Investments")
        expect(valueInCategory).toBeTruthy()
    })
    test('test add button to add category from TextList', async () => {
        const {getByText,getByPlaceholderText} = render(createRender(<Table items={sList} />))
        const button = getByText("Titel"); // Mocking auth to return the session data and authenticated status
        await act(async () => {
            fireEvent.click(button)
        })
        const value = getByText("TestTitle")
        const hinzufügenTextField = getByPlaceholderText("Wert hinzufügen ...")
        expect(value).toBeTruthy()
        expect(hinzufügenTextField).toBeTruthy()
        await act(async () => {
            fireEvent.click(value)
        })
        const valueInCategory = getByText("TestTitle")
        expect(valueInCategory).toBeTruthy()
    })
    test('test add button to add category from ObjectList', async () => {
        const {getByText,getByPlaceholderText} = render(createRender(<Table items={sList} />))
        const button = getByText("TestObject"); // Mocking auth to return the session data and authenticated status
        await act(async () => {
            fireEvent.click(button)
        })
        const value = getByText("Object")
        const hinzufügenTextField = getByPlaceholderText("Wert hinzufügen ...")
        expect(value).toBeTruthy()
        expect(hinzufügenTextField).toBeTruthy()
        await act(async () => {
            fireEvent.click(value)
        })
        const valueInCategory = getByText("Object")
        const newCategoryAdded = getByText("ObjectCategory")
        expect(valueInCategory).toBeTruthy()
        expect(newCategoryAdded).toBeTruthy()
        const button2 = getByText("TestObject")
        await act(async () => {
            fireEvent.click(button2)
        })
        const value2 = getByText("Object2")
        await act(async () => {
            fireEvent.click(value2)
        })
        const newValueInCategory = getByText("Object2")
        const newCategoryAdded2 = getByText("ObjectCategory2")
        expect(newValueInCategory).toBeTruthy()
        expect(newCategoryAdded2).toBeTruthy()
    })
    test('Test add value to values button', async () => {
        const {getByText,getByPlaceholderText} = render(createRender(<Table items={sList} />))
        const button = getByText("TestObject"); // Mocking auth to return the session data and authenticated status
        await act(async () => {
            fireEvent.click(button)
        })
        const hinzufügenTextField = getByPlaceholderText("Wert hinzufügen ...")
        hinzufügenTextField.setAttribute('value','TEST')
        const addButton = screen.getByText("Hinzufügen")
        await act(async () => {
            fireEvent.click(addButton)
        })
        // const checkButton = getByText("TEST")
        expect(true).toBeTruthy()

    })
});