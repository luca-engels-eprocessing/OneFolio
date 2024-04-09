import InvestmentCard from '@/components/InvestmentCard'
import React from 'react'

type Props = {}

const View = (props: Props) => {
  return (
    <main className="flex h-screen w-screen flex-col gap-16 py-24 pl-48 ">
        <h1 className={"h1"}>Ihre Investments im Überblick</h1>
        
        {/*
          //TODO add All the information HERE
          //TODO use a key value pair instead of key1, key2, key3 value1, value2, value3
          //TODO add more key value pairs to the InvestmentCard
          //TODO change the grid when expanded the InvestmentCard
          //TODO expand the investment card on click of the card
          //TODO add functionality to the Anpassen button 
        */}
      <div className={"flex gap-2 border-def bg-sec p-8 flex-col scroll-light dark:scroll-dark rounded-md overflow-y-scroll"}>
        <InvestmentCard date='01.01.2025' title='Investment 1' key1='Branche' value1='Branche 1' key2='Summe' value2='400€' key3='Sparte' value3='Sparte 1'/>
        <InvestmentCard date='01.01.2025' title='Investment 1' key1='Branche' value1='Branche 1' key2='Summe' value2='400€' key3='Sparte' value3='Sparte 1'/>
        <InvestmentCard date='01.01.2025' title='Investment 1' key1='Branche' value1='Branche 1' key2='Summe' value2='400€' key3='Sparte' value3='Sparte 1'/>
        <InvestmentCard date='01.01.2025' title='Investment 1' key1='Branche' value1='Branche 1' key2='Summe' value2='400€' key3='Sparte' value3='Sparte 1'/>
        <InvestmentCard date='01.01.2025' title='Investment 1' key1='Branche' value1='Branche 1' key2='Summe' value2='400€' key3='Sparte' value3='Sparte 1'/>
        <InvestmentCard date='01.01.2025' title='Investment 1' key1='Branche' value1='Branche 1' key2='Summe' value2='400€' key3='Sparte' value3='Sparte 1'/>
        <InvestmentCard date='01.01.2025' title='Investment 1' key1='Branche' value1='Branche 1' key2='Summe' value2='400€' key3='Sparte' value3='Sparte 1'/>
        <InvestmentCard date='01.01.2025' title='Investment 1' key1='Branche' value1='Branche 1' key2='Summe' value2='400€' key3='Sparte' value3='Sparte 1'/>
      </div>
        </main>
  )
}

export default View