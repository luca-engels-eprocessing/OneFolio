'use server'
import {Table} from '@/components/addInvestment/Table'
import React from 'react'


const sList = {
  "Titel": ['string'],
  "Summe": ["number",
    {"10":{"Währung":["text","Euro","US-Dollar","Yen","Pfund"]}},
    {"20":{"Währung":["text","Euro","US-Dollar","Yen","Pfund"]}},
    {"50":{"Währung":["text","Euro","US-Dollar","Yen","Pfund"]}},
    {"100":{"Währung":["text","Euro","US-Dollar","Yen","Pfund"]}},
    {"200":{"Währung":["text","Euro","US-Dollar","Yen","Pfund"]}},
    {"500":{"Währung":["text","Euro","US-Dollar","Yen","Pfund"]}},
  ],
  // "Laufzeit (in Jahren)": ['number',1, 2, 3, 4, 5, 10, 15, 30, 40, 50, 99],
  // "Mehr...":['text'],
  //     "Branche":['text',
  //       {"Energie": {"Sparte": ["Solar Energie", "Wind Energie", "Wasser Energie", "Kern Energie"]}},
  //       {"Technologie": {"Sparte": ["Startups", "Software", "Hardware", "Internet", "Künstliche Intelligenz"]}},
  //       {"Immobilien": {"Sparte": ["Familienhaus", "Mehrfamilienhaus", "Gewerbeimmobilie", "Einfamilienhaus", "Wohnung"]}},
  //       {"Kryptowährung": {"Sparte": ["Bitcoin", "Doge Coin", "Ethereum", "Litecoin", "Ripple"]}},
  //       {"Gesundheit": {"Sparte": ["Pharma", "Biotech", "Medizin"]}},
  //       {"Finanzen": {"Sparte": ["Banken", "Versicherungen", "Fonds"]}},
  //       {"Konsum": {"Sparte": ["Lebensmittel", "Kleidung", "Technik"]}},
  //     ],
  "Mehr...":[
    'text',
    {"Branche": {"Branche": ["text",
        {"Energie": {"Sparte": ["Solar Energie", "Wind Energie", "Wasser Energie", "Kern Energie"]}},
        {"Technologie": {"Sparte": ["Startups", "Software", "Hardware", "Internet", "Künstliche Intelligenz"]}},
        {"Immobilien": {"Sparte": ["Familienhaus", "Mehrfamilienhaus", "Gewerbeimmobilie", "Einfamilienhaus", "Wohnung"]}},
        {"Kryptowährung": {"Sparte": ["Bitcoin", "Doge Coin", "Ethereum", "Litecoin", "Ripple"]}},
        {"Gesundheit": {"Sparte": ["Pharma", "Biotech", "Medizin"]}},
        {"Finanzen": {"Sparte": ["Banken", "Versicherungen", "Fonds"]}},
        {"Konsum": {"Sparte": ["Lebensmittel", "Kleidung", "Technik"]}},
    ]}},
    {"Kapital": {"Kapital": ["text","Eigenkapital", "Fremdkapital"]}},
    {"Startdatum": { "Start Datum des Investments": ['date'],}},
    {"Kündigung": {"Kündigung": ["text","Kündbar", "Unkündbar"]}},
    {"Sicherheit": {"Sicherheit": ["text","Sicher", "Unsicher"]}},
    {"Steuer": {"Steuer": ["text","Steuerfrei", "Steuerpflichtig"]}},
    {"Rendite": {"Rendite (in %)": ["number",5,7,10,15,20]}},
    {"Risikoklasse": {"Risikoklasse 1 < 5": ["number",1,2,3,4,5]}},
    {"Währung": {"Währung": ["text","EUR", "USD", "JPY", "GBP" ]}},
    {"Zahlung": {"Zahlung": ["text","Monatlich", "Jährlich"]}},
    {"Zinsen": {"Zinsen": ["text","Festzins", "Variabel"]}}
  ]
}


async function AddNew(props:{params:{},searchParams:{[key:string]:any}}) {
  //* useful props to automatically implement in the list are: Summe, Währung, Name, Beschreibung, date
  
  const {Titel,Summe,...rest} = sList
  var newList:{} = {"Summe":Summe}
  var startList = {}
  if(props.searchParams.data){
    const investmentData = JSON.parse(props.searchParams.data)
    newList={"Summe":['number',Math.abs(investmentData.amount)],"Währung":['text',investmentData.currency],"Transaktion":['text',investmentData.description],"Start Datum des Investments":['date',investmentData.date]}
    startList={"Summe":Math.abs(investmentData.amount),"Währung":investmentData.currency,"Transaktion":investmentData.description,"Start Datum des Investments":investmentData.date}
  }
  return (
    <main className="h-full w-full flex flex-col gap-8 items-center justify-start pb-2 px-4 xl:py-0">
        <h1 className={"h1"}>Fügen sie neue Investments hinzu</h1>
        <Table items={{Titel,...newList,...rest}} startSelection={startList} />
    </main>
  )
}

export default AddNew