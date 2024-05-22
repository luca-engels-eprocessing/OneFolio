'use server'
import {Table} from '@/components/addInvestment/Table'
import React from 'react'


const sList = {
  "Titel": ['string'],
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
    {"Summe": {"Summe": ["number",
      {"100":{"Währung":["text","Euro","Dollar","Yen","Pfund"]}},
      {"200":{"Währung":["text","Euro","Dollar","Yen","Pfund"]}},
      {"300":{"Währung":["text","Euro","Dollar","Yen","Pfund"]}},
    ]}},
    {"Rendite": {"Rendite (in %)": ["number",5,7,10,15,20]}},
    {"Risikoklasse": {"Risikoklasse 1 < 5": ["number",1,2,3,4,5]}},
    {"Währung": {"Währung": ["text","Euro", "Dollar", "Yen", "Pfund"]}},
    {"Zahlung": {"Zahlung": ["text","Monatlich", "Jährlich"]}},
    {"Zinsen": {"Zinsen": ["text","Festzins", "Variabel"]}}
  ]
}


async function AddNew() {
  return (
    <main className="h-full w-full flex flex-col gap-8 items-center justify-start  pb-2">
        <h1 className={"h1"}>Fügen sie neue Investments hinzu</h1>
        <Table items={sList} />
    </main>
  )
}

export default AddNew