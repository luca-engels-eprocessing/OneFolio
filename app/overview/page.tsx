"use server"
import InvestmentCard from '@/components/InvestmentCard'
import React from 'react'

type Props = {}

const data = {
  investments: [
    {
      date: '01.01.2025',
      title: 'Global Solar Fund',
      details: {
        Branche: 'Energie',
        Summe: '400€',
        Sparte: 'Solar Energie',
        Laufzeit: '5 Jahre',
        Risikoklasse: '1',
        Rendite: '5%'
      },
    },
    {
      date: '01.01.2025',
      title: 'Bitcoin Depot',
      details: {
        Branche: 'Kryptowährung',
        Summe: '1000€',
        Sparte: 'Bitcoin',
        Typ: 'Aktienfonds',
        Wiederholung: 'Monatlich',
        Zum: '5ten des Monats',
        Betrag: '50€'
      },
    },
    {
      date: '01.01.2026',
      title: 'Real Estate Investment Trust',
      details: {
        Branche: 'Immobilien',
        Summe: '2000€',
        Sparte: 'Immobilienfonds',
        Laufzeit: '10 Jahre',
        Risikoklasse: '2',
        Rendite: '7%'
      },
    },
    {
      date: '01.01.2026',
      title: 'Tech Startups',
      details: {
        Branche: 'Technologie',
        Summe: '1500€',
        Sparte: 'Startups',
        Typ: 'Aktienfonds',
        Wiederholung: 'Quartalsweise',
        Zum: '1ten des Monats',
        Betrag: '100€'
      },
    }
  ],
}

const View = async (props: Props) => {
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
        {data.investments.map((investment, index) => (
          <InvestmentCard key={index} {...investment} />
        ))}
      </div>
        </main>
  )
}

export default View