import Table from '@/components/addInvestment/Table'
import React from 'react'


const startList = {
    "Titel": [],
    "Laufzeit": ["1 Jahr", "2 Jahre", "3 Jahre", "4 Jahre", "5 Jahre", "6 Jahre", "7 Jahre", "8 Jahre", "9 Jahre", "10 Jahre", "15 Jahre", "20 Jahre", "25 Jahre", "30 Jahre", "35 Jahre", "40 Jahre", "45 Jahre", "50 Jahre"],
    "Branche": {
        "Energie": {
            "Sparte": ["Solar Energie", "Wind Energie", "Wasser Energie", "Kern Energie"]
        },
        "Technologie": {
            "Sparte": ["Startups", "Software", "Hardware", "Internet", "Künstliche Intelligenz"]
        },
        "Immobilien": {
            "Sparte": ["Familienhaus", "Mehrfamilienhaus", "Gewerbeimmobilie","Einfamilienhaus", "Wohnung"]
        },
        "Kryptowährung": {
            "Sparte": ["Bitcoin", "Etherium", "Doge Coin"]
        },
        "Gesundheit": {
            "Sparte": ["Pharma", "Biotech", "Medizin"]
        },
        "Finanzen": {
            "Sparte": ["Banken", "Versicherungen", "Fonds"]
        },
        "Konsum": {
            "Sparte": ["Lebensmittel", "Kleidung", "Technik"]
        },
    },
    "Mehr ...": {
      "Kapital": ["Eigenkapital", "Fremdkapital"],
      "Kündigung": ["Kündbar", "Unkündbar"],
      "Sicherheit": ["Sicher", "Unsicher"],
      "Steuer": ["Steuerfrei", "Steuerpflichtig"],
      "Summe":[],
      "Rendite": ["5%", "7%", "10%", "12%", "15%", "20%"],
      "Risikoklasse": ["1", "2", "3", "4", "5"],
      "Währung": ["Euro", "Dollar", "Yen", "Pfund"],
      "Zahlung": ["Monatlich", "Jährlich"],
      "Zinsen": ["Festzins", "Variabel"],
    }
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