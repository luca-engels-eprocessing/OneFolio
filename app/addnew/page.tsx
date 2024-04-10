import Table from '@/components/addInvestment/Table'
import React from 'react'


const sList = {
    Titel: [],
    Laufzeit: ["1 Jahr", "2 Jahre", "3 Jahre", "4 Jahre", "5 Jahre", "6 Jahre", "7 Jahre", "8 Jahre", "9 Jahre", "10 Jahre", "15 Jahre", "20 Jahre", "25 Jahre", "30 Jahre", "35 Jahre", "40 Jahre", "45 Jahre", "50 Jahre"],
    Branche: ["Energie", "Technologie", "Immobilien", "Kryptowährung", "Gesundheit", "Finanzen", "Konsum", "Industrie", "Rohstoffe", "Sonstige"],
    Sparte: ["Solar Energie", "Wind Energie", "Wasser Energie", "Kern Energie"],
    Aktien: ["Dax", "TecDax", "MDax", "SDax", "Nasdaq", "Dow Jones", "S&P 500"],
    Anleihen: ["Staatsanleihen", "Unternehmensanleihen", "Hochzinsanleihen", "Mischfonds", "Rentenfonds", "Geldmarktfonds", "Immobilienfonds", "Aktienfonds"],
    Rohstoffe: ["Edelmetalle", "Rohstoffe", "Immobilien", "Kryptowährungen", "Fonds", "ETFs", "Sparpläne", "Zertifikate", "Optionen", "Kredit", "Konto"],
    Immobilien: ["Familienhaus", "Mehrfamilienhaus", "Gewerbeimmobilie", "Immobilienfonds"],
    Kryptowährungen: ["Bitcoin","Etherium","Doge Coin"],
    Fonds: ["Mischfonds", "Rentenfonds", "Geldmarktfonds", "Immobilienfonds", "Aktienfonds"],
    Rendite: ["5%", "7%", "10%", "12%", "15%", "20%"],
}
const startList = {
    Titel: [],
    Laufzeit: ["1 Jahr", "2 Jahre", "3 Jahre", "4 Jahre", "5 Jahre", "6 Jahre", "7 Jahre", "8 Jahre", "9 Jahre", "10 Jahre", "15 Jahre", "20 Jahre", "25 Jahre", "30 Jahre", "35 Jahre", "40 Jahre", "45 Jahre", "50 Jahre"],
    Branche: {
        Energie: {
            Sparte: ["Solar Energie", "Wind Energie", "Wasser Energie", "Kern Energie"]
        },
        Technologie: {
            Sparte: ["Startups", "Software", "Hardware", "Internet", "Künstliche Intelligenz"]
        },
        Immobilien: {
            Sparte: ["Familienhaus", "Mehrfamilienhaus", "Gewerbeimmobilie","Einfamilienhaus", "Wohnung"]
        },
        Kryptowährung: {
            Sparte: ["Bitcoin", "Etherium", "Doge Coin"]
        },
        Gesundheit: {
            Sparte: ["Pharma", "Biotech", "Medizin"]
        },
        Finanzen: {
            Sparte: ["Banken", "Versicherungen", "Fonds"]
        },
        Konsum: {
            Sparte: ["Lebensmittel", "Kleidung", "Technik"]
        },
    },
    Summe:[],
    Rendite: ["5%", "7%", "10%", "12%", "15%", "20%"],
    Risikoklasse: ["1", "2", "3", "4", "5"],
}

function AddNew() {
  return (
    <main className="flex h-screen w-screen flex-col gap-16 py-24 pl-48 ">
        <h1 className={"h1"}>Fügen sie neue Investments hinzu</h1>
        <Table items={startList}/>
    </main>
  )
}

export default AddNew