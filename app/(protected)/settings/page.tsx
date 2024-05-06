"use server"
import React from 'react'
import  {LogoutButton,UserInformaiton} from '@/components/auth/LogoutButton'
import {auth} from "@/auth"
import { getUserById } from '@/utils/db'
type Props = {}

const bankData = {
  IBAN: 'DE12345678912345678912',
  BIC: 'ABCDEF12345',
  Bank: 'Musterbank',
  Bankleitzahl: '12345678',
  "Tracking Starten": 'Läuft...',
  "Gesammelte Daten": 'Einsehen...',
  "News über ihre Investments erhalten": "Ja",
  "Konto Löschen": "Jetzt löschen..."

}



const liItem = (key: string,value:string, item:number) => {
  return (
    <li className='p-4 btn-nav my-2 font-light text-sm rounded-2xl' key={item}>{key + ":"}
    <br></br>
      <span className='font-normal text-xl'>{value}</span>
    </li>
  )
}


async function Settings({}: Props) {
  const session = await auth()
  if(!session || !session.user ||!session.user.id){
    return <p>Loading...</p>
  }
  const userData = await getUserById(session.user.id)
  return (
    <main className="h-full w-full flex flex-col gap-8 items-center justify-center">
        <div>
          <h1 className={"h1"}>Ihre Einstellungen</h1>
        </div>
        <div className="flex h-[80vh] w-[80vw] border-def bg-sec xl:flex-row flex-col rounded-md overflow-hidden">
          <div className='w-1/2 px-16 py-8 overflow-y-scroll scroll-light dark:scroll-dark'>
            <h1 className='text-accent text-4xl font-semibold'>Nutzer Informationen</h1>
            <LogoutButton />
            <ul className=''>
            <UserInformaiton info={userData}/>
            </ul>
          </div>
          <div className='w-1/2 px-16 py-8 overflow-y-scroll scroll-light dark:scroll-dark'>
            <h1 className='text-accent text-4xl font-semibold'>Bankdaten</h1>
            <ul className=''>
              {
                Object.entries(bankData).map(([key, value],index) => {
                  return liItem(key,value,index)
                })
              }
            </ul>
          </div>
        </div>
    </main>
  )
}

export default Settings
