import React, { Dispatch,SetStateAction, ReactNode, useEffect, useRef, useState } from 'react'

type Props = {
  state: (val: string) => void;
  displayList: ReactNode[];
  setDisplayList: (val: ReactNode[]) => void;
  setDisplayed: (val: boolean) => void;
}


function ValueBar(props: Props) {
    const [valueFormButtonList, setValueFormButtonList] = useState<ReactNode[]>(
        []
      ); // List of buttons in the form
      const [valueDisplayAddButton, setValueDisplayAddButton] = useState(false); // Switch for add button or input field
      const [valueInput, setValueInput] = useState(""); // Saves the input field ==> No use of Form needed and no page relaod
      const valueAddTextFieldRef = useRef<HTMLInputElement>(null); // Ref for the input field to auto select
      const valueNewestButtonRef = useRef<HTMLButtonElement>(null); // Ref for the newest button added by the input field to auto select after adding
      const setDisplayed = props.setDisplayed;
    
     
    
      // Auto focus on the input field or the newest button
      useEffect(() => {
        if (valueDisplayAddButton && valueAddTextFieldRef.current) {
          valueAddTextFieldRef.current.focus();
        } else if (valueNewestButtonRef.current) {
          valueNewestButtonRef.current.focus();
        }
      }, [valueDisplayAddButton]);

    const selectionClick = (clickedButton: string) => {
        console.log(clickedButton);
        props.state(clickedButton);
        setDisplayed(false);
      };

      
  /** Creates a new Button and saves it to the form */
  const createValueButton = () => {
    const text = valueInput;
    if (text == "") {
      setValueDisplayAddButton(false);
      return;
    }
    const buttonCode = (
      <button
        ref={valueNewestButtonRef}
        type={"button"}
        onClick={() => selectionClick(text)}
        className="btn-nav rounded-lg px-4 py-2"
      >
        <p>{text}</p>
      </button>
    );
    setValueDisplayAddButton(false);
    setValueFormButtonList([...valueFormButtonList, buttonCode]);
  };
  
  const handleAddInputChange = (e: { target: { value: any; }; }) => {
    setValueInput(e.target.value);
  };

  const handleInputKeyPress = (e: { key: string; }) => {
    if (e.key === "Enter") {
        createValueButton();
    }
  };


  return (
        <form
            className={
            "flex-col flex gap-2 bg-sec border-def p-8 overflow-y-scroll scroll-light dark:scroll-dark"
            }
        >
            {valueFormButtonList.map((item, index) => (
            <div key={index}>{item}</div>
            ))}
            {valueDisplayAddButton ? (
            <div>
                <input
                type={"text"}
                ref={valueAddTextFieldRef}
                className="btn-nav rounded-lg px-4 py-2 w-32"
                onKeyDown={handleInputKeyPress}
                onChange={handleAddInputChange}
                />
                <button
                type={"button"}
                className="btn-nav rounded-lg px-4 py-2"
                onClick={createValueButton}
                >
                +
                </button>
            </div>
            ) : (
            <button
                type={"button"}
                onClick={() => setValueDisplayAddButton(true)}
                className="btn-nav rounded-lg px-4 py-2"
            >
                <p>Neu Hinzufügen</p>
            </button>
            )}
    </form>
  )
}

export default ValueBar