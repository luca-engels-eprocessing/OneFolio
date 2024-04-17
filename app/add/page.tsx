import Table from '@/components/addInvestment/Table'
import React from 'react'


const startList = {
    "Titel": {},
    "Laufzeit": {0:"1 Jahr",1: "2 Jahre",2: "3 Jahre",3: "4 Jahre",4: "5 Jahre",5: "10 Jahre",6: "15 Jahre",7: "30 Jahre",8: "40 Jahre",9: "50 Jahre",10: "Unbegrenzt"},
    "Branche": {
        "Energie": {
            "Sparte": {0:"Solar Energie",1: "Wind Energie",2: "Wasser Energie",3: "Kern Energie"}
        },
        "Technologie": {
            "Sparte": {0:"Startups",1: "Software",2: "Hardware",3: "Internet",4: "Künstliche Intelligenz"}
        },
        "Immobilien": {
            "Sparte": {0:"Familienhaus",1: "Mehrfamilienhaus",2: "Gewerbeimmobilie",3: "Einfamilienhaus",4: "Wohnung"}
        },
        "Kryptowährung": {
            "Sparte": {0:"Bitcoin",1: "Doge Coin",2: "Ethereum",3: "Litecoin",4: "Ripple"}
        },
        "Gesundheit": {
            "Sparte": {0:"Pharma",1: "Biotech",2: "Medizin"}
        },
        "Finanzen": {
            "Sparte": {0:"Banken",1: "Versicherungen",2: "Fonds"}
        },
        "Konsum": {
            "Sparte": {0:"Lebensmittel",1: "Kleidung",2: "Technik"}
        },
    },
    "Mehr...": {
        "Kapital":{"Kapital":{0:"Eigenkapital",1: "Fremdkapital"},},
        1:{"Kündigung":{0:"Kündbar",1: "Unkündbar"},},
        2:{"Sicherheit":{0:"Sicher",1: "Unsicher"},},
        3:{"Steuer":{0:"Steuerfrei",1: "Steuerpflichtig"},},
        4:{"Summe":{},},
        5:{"Rendite":{0:"5%",1: "7%",2: "10%",3: "12%",4: "15%",5: "20%"},},
        6:{"Risikoklasse":{0:"1",1: "2",2: "3",3: "4",4: "5"},},
        7:{"Währung":{0:"Euro",1: "Dollar",2: "Yen",3: "Pfund"},},
        8:{"Zahlung":{0:"Monatlich",1: "Jährlich"},},
        9:{"Zinsen":{0:"Festzins",1: "Variabel"},}
    }
}

function AddNew() {
  return (
    <main className="flex w-screen flex-col gap-16 xl:py-24 pt-s0 pb-8 h-[calc(100vh-11rem)]  xl:pl-48 px-16 ">
        <h1 className={"h1"}>Fügen sie neue Investments hinzu</h1>
        <Table items={startList} />
    </main>
  )
}

export default AddNew