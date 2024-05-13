"use server"
import React from 'react'
import  {LogoutButton,UserInformaiton} from '@/components/auth/LogoutButton'
import {auth} from "@/auth"
import { getUserById } from '@/utils/db'
import { cn } from '@/lib/utils'
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
  // return (
  //   <li className='p-4 btn-nav my-2 font-light text-sm rounded-2xl' key={item}>{key + ":"}
  //   <br></br>
  //     <span className='font-normal text-xl'>{value}</span>
  //   </li>
  // )
  if(value.length>18){
    value = value.substring(0,14)+"..."
  }
  return (
    
    <div className='lg:p-4 p-2 btn-nav xl:my-2 my-1 font-light xl:text-sm text-xs xl:rounded-2xl rounded-md'><p className="text-textLight/70 dark:text-textDark/50" key={item}>{key + ":"}</p>
      <span className={cn(value?'text-textLight dark:text-textDark':'text-textLight/50 dark:text-textDark/50','font-normal xl:text-xl lg:text-lg text-sm')}>{value?value:"Jetzt hinzufügen!"}</span>
    </div>
  )
}


async function Settings({}: Props) {
  const session = await auth()
  if(!session || !session.user ||!session.user.id){
    return <p>Loading...</p>
  }
  const userData = await getUserById(session.user.id)
  if(!userData){
    return  <p>ERROR</p>
  }
  const {name,email,address} = userData
  

  const user = {name,email,address}

  return (
    <main className="h-full w-full flex flex-col gap-8 items-center justify-start pb-2">
        <div>
          <h1 className={"h1"}>Ihre Einstellungen</h1>
        </div>
        <div className="flex w-[80vw] h-[100%] border-def bg-sec xl:flex-row gap-y-4 flex-col rounded-md overflow-hidden">
          <div className='xl:w-1/2 w-full px-16 py-8 overflow-y-scroll scroll-light dark:scroll-dark'>
            <h2 className='text-accent h2 font-semibold'>Nutzer Informationen</h2>
              <UserInformaiton info={user} key={1}/>
              <LogoutButton key={2}/>
          </div>
          <div className='xl:w-1/2 w-full px-16 py-8 overflow-y-scroll scroll-light dark:scroll-dark'>
            <h2 className='text-accent h2 font-semibold'>Bankdaten</h2>
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
