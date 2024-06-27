"use server"
import { auth } from '@/auth'
import InvestmentCard from '@/components/overview/InvestmentCard'
import { columns } from '@/components/overview/colums'
import { DataTable } from '@/components/overview/data-table'
import { Button } from '@/components/ui/button'
import { investment } from '@/models/model'
import { deleteInvestmentById, getInvestmentsByUserId } from '@/utils/db'
import { Metadata } from 'next'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import React from 'react'

type Props = {}

const data = [
    {
      date: '01.01.2025',
      title: 'Global Solar Fund',
      id:"a",
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
      id:"s",
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
      id:"d",
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
      id:"f",
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
  ]
  
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "OneFolio | Investmentübersicht",
    description: "Jetzt können sie ihre Investments leicht im Überblick halten",
  }
}

const View = async (props:{params:{},searchParams:{[key:string]:any}}) => {
  const session = await auth()
  if(!session || !session.user ||!session.user.id){
    return <p>Loading...</p>
  }
  const investmentData = await getInvestmentsByUserId(session.user.id)
  if(!investmentData){
    return  <p>ERROR</p>
  }
  let list:{id:string,title:string,date:string,[rest:string]:string,addSum:string}[] = investmentData.map((data:any)=>{
    const id = data._id
    const {title,date,...rest} = data.data
    const ret = {title,date,...rest,id,addSum:''}
    return ret
  })
  if(props.searchParams.data){
    const investmentData = JSON.parse(props.searchParams.data)
    list = list.map(object=>{
      const o = {...object, ["addSum"]:investmentData.amount}
      return o
    })
  }

  return (
    <main className="h-full w-full flex flex-col gap-8 items-center justify-start px-4 xl:px-0 pb-2">
        <h1 className={"h1"}>Ihre Investments im Überblick</h1>
      <div className={"w-full flex gap-2 flex-col overflow-y-auto"}>
        <DataTable columns={columns} data={list} displayAddSum={props.searchParams.data?true:false} />
      </div>
    </main>
  )
}


export default View
