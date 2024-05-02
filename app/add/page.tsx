'use server'
import Table from '@/components/addInvestment/Table'
import React from 'react'


const sList = {
    "Title": [],
    "Laufzeit (in Jahren)": [1, 2, 3, 4, 5, 10, 15, 30, 40, 50, 99],
    "Branche":[
        {"Energie": {"Sparte": ["Solar Energie", "Wind Energie", "Wasser Energie", "Kern Energie"]}},
        {"Technologie": {"Sparte": ["Startups", "Software", "Hardware", "Internet", "Künstliche Intelligenz"]}},
        {"Immobilien": {"Sparte": ["Familienhaus", "Mehrfamilienhaus", "Gewerbeimmobilie", "Einfamilienhaus", "Wohnung"]}},
        {"Kryptowährung": {"Sparte": ["Bitcoin", "Doge Coin", "Ethereum", "Litecoin", "Ripple"]}},
        {"Gesundheit": {"Sparte": ["Pharma", "Biotech", "Medizin"]}},
        {"Finanzen": {"Sparte": ["Banken", "Versicherungen", "Fonds"]}},
        {"Konsum": {"Sparte": ["Lebensmittel", "Kleidung", "Technik"]}},
    ],
    "Mehr...":[
        {"Kapital": {"Kapital": ["Eigenkapital", "Fremdkapital"]}},
        {"Kündigung": {"Kündigung": ["Kündbar", "Unkündbar"]}},
        {"Sicherheit": {"Sicherheit": ["Sicher", "Unsicher"]}},
        {"Steuer": {"Steuer": ["Steuerfrei", "Steuerpflichtig"]}},
        {"Summe": {"Summe": []}},
        {"Rendite": {"Rendite (in %)": [5,7,10,15,20]}},
        {"Risikoklasse": {"Risikoklasse 1 < 5": [1,2,3,4,5]}},
        {"Währung": {"Währung": ["Euro", "Dollar", "Yen", "Pfund"]}},
        {"Zahlung": {"Zahlung": ["Monatlich", "Jährlich"]}},
        {"Zinsen": {"Zinsen": ["Festzins", "Variabel"]}}
    ]

}

async function AddNew() {
  const list = await sList
  return (
    <main className="flex w-screen flex-col gap-16 xl:py-24 pt-s0 pb-8 h-[calc(100vh-11rem)]  xl:pl-48 px-16 ">
        <h1 className={"h1"}>Fügen sie neue Investments hinzu</h1>
        <Table items={list} />
    </main>
  )
}

export default AddNew