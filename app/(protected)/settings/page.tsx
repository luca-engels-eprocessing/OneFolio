"use server"
import React from 'react'
import SigninButton, {UserInformaiton} from '@/components/auth/SigninButton'
import SignupButton from '@/components/auth/SignupButton'
import {auth} from "@/auth"
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
  const session = await auth();
  if (session) {
    return <div>{JSON.stringify(session)}</div>
  }
  return (
    <main className="flex h-[calc(100vh-11rem)] xl:h-screen w-full flex-col gap-16 py-24 xl:pl-48 px-16 ">
        <div>
          <h1 className={"h1"}>Ihre Einstellungen</h1>
        </div>
        <div className="flex h-full border-def bg-sec xl:flex-row flex-col rounded-md overflow-hidden">
        <div className='w-1/2 px-16 py-8 overflow-y-scroll scroll-light dark:scroll-dark'>
            <h1 className='text-accent text-4xl font-semibold'>Nutzer Informationen</h1>
            
            <SigninButton>
              <div className="flex flex-col">
                <button className="p-4 btn-nav font-normal text-xl rounded-t-2xl border-b-[1px] text-center">Einloggen</button>
              </div>
            </SigninButton>
            <SignupButton>
              <div className="flex flex-col">
                <button className="p-4 btn-nav font-normal text-xl rounded-b-2xl border-t-[1px] text-center">Registrieren</button>
              </div>
            </SignupButton>
            <ul className=''>
            <UserInformaiton />
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