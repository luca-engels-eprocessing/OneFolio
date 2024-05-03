"use server"
import React from 'react'
import SigninButton, {UserInformaiton} from '@/components/auth/SigninButton'
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

  return (
    <main className="flex h-[calc(100vh-11rem)] xl:h-screen w-full flex-col gap-16 py-24 xl:pl-48 px-16 ">
        <div>
          <h1 className={"h1"}>Ihre Einstellungen</h1>
        </div>
        <div className="flex h-full border-def bg-sec xl:flex-row flex-col rounded-md overflow-hidden">
        <div className='w-1/2 px-16 py-8 overflow-y-scroll scroll-light dark:scroll-dark'>
            <h1 className='text-accent text-4xl font-semibold'>Nutzer Informationen</h1>
            
            <ul className=''>
            <SigninButton />
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