"use server"
import { auth } from '@/auth'
import InvestmentCard from '@/components/InvestmentCard'
import { Button } from '@/components/ui/button'
import { investment } from '@/models/model'
import { deleteInvestmentById, getInvestmentsByUserId } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
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
  const session = await auth()
  if(!session || !session.user ||!session.user.id){
    return <p>Loading...</p>
  }
  const investmentData:investment[] = await getInvestmentsByUserId(session.user.id)
  if(!investmentData){
    return  <p>ERROR</p>
  }
  const list = investmentData.map((data)=>{
    const id = data._id
    const {title,date,data:det} = data.data
    let details = {}
    det.map((e)=> {
      details = {...details,[e.key]:e.value}
    })
    const ret = {title,date,details,id}
    return ret
  })

  return (
    <main className="h-full w-full flex flex-col gap-8 items-center justify-start  pb-2">
        <h1 className={"h1"}>Ihre Investments im Überblick</h1>
        
        {/*
          //TODO add All the information HERE
          //TODO use a key value pair instead of key1, key2, key3 value1, value2, value3
          //TODO add more key value pairs to the InvestmentCard
          //TODO change the grid when expanded the InvestmentCard
          //TODO expand the investment card on click of the card
          //TODO add functionality to the Anpassen button 
        */}
      <div className={"w-[80vw] flex gap-2 border-def bg-sec p-4 flex-col scroll-light dark:scroll-dark rounded-md overflow-y-scroll"}>
        {(Array.isArray(list) && list.length === 0)?
        <div className='flex flex-col justify-center'>
          <h1 className={"text-4xl text-center"}>Keine Investments vorhanden</h1>
          
          <Button className='cursor-pointer justify-center' variant={"link"} size={"sm"} asChild>
            <Link href={"/add"}>
              <p className={"text-center"}>Fügen sie neue Investments hinzu</p>
            </Link>
          </Button>
        </div>
        :list.map((investment, index) => (
          <InvestmentCard key={index} data={investment} deleteOnClick={async ()=>{
            "use server"
            await deleteInvestmentById(investment.id||"")
            revalidatePath('/overview')
            revalidatePath('/')
          }}/>
        ))}
      </div>
        </main>
  )
}


export default View