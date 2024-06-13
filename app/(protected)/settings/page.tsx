"use server"
import React, { ReactNode } from 'react'
import  {LogoutButton,UserInformaiton} from '@/components/auth/LogoutButton'
import {auth} from "@/auth"
import { getUserById, removeFromUser } from '@/utils/db'
import Plaid from '@/components/plaid/plaid'
import { createLinkToken, exchangeToken, removeAccessToken} from '@/utils/plaid_API'
import { getTransactionCards } from '@/components/plaid/transactionList'
import { revalidatePath } from 'next/cache'


declare global{
  var TransactionData:ReactNode[]
}

type Props = {}





async function Settings({}: Props) {
  const session = await auth()
  if(!session || !session.user ||!session.user.id){
    return <p>Loading...</p>
  }
  const id = session.user!.id!
  const userData = await getUserById(id)
  if(!userData){
    return  <p>ERROR</p>
  }
  const {name,email,address,accessToken} = userData
  

  const user = {name,email,address}

  // get Transaction Link if currently none exists
  var linkToken
  if(!accessToken){
    const response = await createLinkToken({id,name,address}); 
    linkToken=response.link_token
    if(!linkToken){
      // RETURN ERROR
      return <div>ERROR</div>
    }
  }
  else{
    globalThis.TransactionData = await getTransactionCards(accessToken,id);
  }

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
            <ul className='flex flex-col gap-4'>
              
              <Plaid user={{id:session.user.id,name,address}} token={linkToken!} removeAccessToken={removeAccess } convertToken={convertToken} accessToken={accessToken}>
                  <div className='flex flex-col justify-center items-center'>
                    <form action={async()=>{"use server";refreshTransactions(id,accessToken,true)}} >
                      <button className='text-lg underline text-textLight/70 dark:text-textDark/50'>Alle Transaktionen laden</button>
                    </form>
                    <form action={async()=>{"use server";refreshTransactions(id,accessToken,false)}} >
                      <button className='text-3xl underline text-textLight dark:text-textDark/70'>Neue Transaktionen laden</button>
                    </form>
                  </div>
                </Plaid>
              {accessToken&&globalThis.TransactionData}
              {globalThis.TransactionData&&globalThis.TransactionData.length>0&& 
              <div className="flex flex-col border-def bg-prim rounded-2xl p-4 ">
                <div className="flex flex-col">
                    <p className="text-xs text-textLight/70 dark:text-textDark/50">Kategorie & Parteien zu % richtig: </p>
                    <div className="flex flex-row gap-4">
                      <p className='text-sm text-green-500'>Grün: {'>'}90%</p> <p className='text-sm text-red-500'>Rot: {'<'}90%</p> 
                    </div>
                  </div>
              </div>}
            </ul>
          </div>
        </div>
    </main>
  )
}
export default Settings

const removeAccess= (accessToken:string) =>{
  "use server"
  removeAccessToken(accessToken)
  globalThis.TransactionData = []
  revalidatePath("/settings")
}

const convertToken = async (publicToken:string) => {
  "use server"
  const response = await exchangeToken(publicToken)
  return response.access_token
}

const refreshTransactions = async (userId:string,accessToken:string,dontIncludeCursor:boolean) => {
  "use server"
  if(dontIncludeCursor) await removeFromUser(userId,{"cursor":""})
  globalThis.TransactionData = await getTransactionCards(accessToken,userId);
  revalidatePath("/settings")
}

const deleteAccount = async (userId:string) => {
  throw {error:"not jet supported"}
}