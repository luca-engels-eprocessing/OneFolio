"use client";
import ValueBar from "@/components/ValueBar";
import React from "react"
import { useEffect, useRef, useState, ReactNode } from "react";

export default function Page() {
  const [displayValue, setDisplayValue] = useState(false); // Displayes the side Panel for selection or not
  const [returns, setReturns] = useState(""); // Returns of the investment
  const [categoryDisplayAddButton, setCategoryDisplayAddButton] =
    useState(false); // Switch for add button or input field
  const [categoryFormButtonList, setCategoryFormButtonList] = useState<
    ReactNode[]
  >([]); // List of buttons in the form
  const [categroyInput, setcategoryInput] = useState(""); // Saves the input field ==> No use of Form needed and no page relaod
  const categoryAddTextFieldRef = useRef<HTMLInputElement>(null);
  const categoryNewestButtonRef = useRef<HTMLButtonElement>(null);


  useEffect(() => {
    if (categoryDisplayAddButton && categoryAddTextFieldRef.current) {
      categoryAddTextFieldRef.current.focus();
    } else if (categoryNewestButtonRef.current) {
      categoryNewestButtonRef.current.focus();
    }
  }, [categoryDisplayAddButton]);

  // Displayes the side Panel
  /* TODO  Remove and put in the buttons created / use data of button to create a specific table*/
  const categoryClick = (text: string) => {
    console.log(text);
    setDisplayValue(true);
  };

  /* TODO use the text and send it back to the Category button */

  const createCategoryButton = () => {
    console.log(returns);
    
    const text = categroyInput;
    setcategoryInput("");
    if (text == "") {
      return;
    }
    const buttonCode = (
      <button
        type={"button"}
        onClick={() => categoryClick(text)}
        ref={categoryNewestButtonRef}
        className={
          "btn-nav flex flex-row px-4 py-2 rounded-lg gap-4 justify-center items-center"
        }
      >
        <p className={"rounded-l-lg"}>{text}</p>
        <div
          className={"h-8 border-r-2 border-accentLight dark:border-accentDark"}
        />
        <p className={"rounded-l-lg"}>...</p>
      </button>
    );
    console.log(buttonCode);
    console.log(categoryFormButtonList);
    setCategoryDisplayAddButton(false);
    setCategoryFormButtonList([...categoryFormButtonList, buttonCode]);
  };

  const handleAddInputChange = (e: { target: { value: any; }; }) => {
    setcategoryInput(e.target.value);
  };

  const handleInputKeyPress = (e: { key: string; }) => {
    if (e.key === "Enter") {
      createCategoryButton();
    }
  };

  return (
    <main className="flex h-screen w-screen flex-col gap-16 py-24 pl-48 ">
      <div className={""}>
        <h1 className={"h1"}>Fügen sie ein neues Investment hinzu</h1>
      </div>
      <div className={"flex flex-row overflow-clip gap-32"}>
        <form
          className={
            "border-def bg-sec p-8 flex gap-2 flex-col overflow-y-scroll scroll-light dark:scroll-dark"
          }
        >
            
            {categoryFormButtonList.map((item: any, index: any) => (
            <div key={index}>{item}</div>
            ))}
          {categoryDisplayAddButton ? (
            <div>
              <input
                type={"text"}
                ref={categoryAddTextFieldRef}
                className="btn-nav rounded-lg px-4 py-2 w-32"
                onKeyDown={handleInputKeyPress}
                onChange={handleAddInputChange}
              />
              <button
                onClick={createCategoryButton}
                type={"button"}
                className="btn-nav rounded-lg px-4 py-2"
              >
                +
              </button>
            </div>
          ) : (
            <button
              type={"button"}
              onClick={() => setCategoryDisplayAddButton(true)}
              className={
                "btn-nav flex flex-row px-4 py-2 rounded-lg gap-4 justify-center items-center"
              }
            >
              <div className={"h-8 items-center flex"}>
                <p className={"rounded-l-lg"}>Neue Kategorie</p>
              </div>
            </button>
          )}
          <div className={"mt-3 w-72"}>
            <button
              onClick={() => console.log("HERE")}
              className={"btn-nav w-1/2 border-r-[1px] rounded-l-lg p-2 px-4"}
            >
              Speichern
            </button>
            <button
              onClick={() => console.log("HERE")}
              className={
                "btn-nav border-l-[1px] rounded-r-lg w-1/2 p-2 text-nowrap px-4"
              }
            >
              Layout sichern
            </button>
          </div>
        </form>
        {displayValue && <ValueBar displayList={categoryFormButtonList} setDisplayList={setCategoryFormButtonList} state={setReturns} setDisplayed={setDisplayValue} />}
      </div>
    </main>
  );
}
