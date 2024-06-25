"use server"
import React, { ReactNode } from 'react'
import  {LogoutButton,UserInformaiton} from '@/components/auth/LogoutButton'
import {auth} from "@/auth"
import { getLatestCursorOrUndefined, getUserById, removeFromUser, updateUser } from '@/utils/db'
import Plaid from '@/components/plaid/plaid'
import { createLinkToken, exchangeToken, removeAccessToken, transactionSync} from '@/utils/plaid_API'
import { TransactionCard } from '@/components/plaid/transactionList'
import { revalidatePath, revalidateTag } from 'next/cache'
import { RemovedTransaction, Transaction } from 'plaid'


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
    const data = await getTransactionCards(accessToken,id);
    globalThis.TransactionData = data
  }
  return (
    <main className="h-full w-full flex flex-col gap-8 items-center justify-start pb-2 px-4 xl:px-0">
        <div>
          <h1 className={"h1"}>Ihre Einstellungen</h1>
        </div>
        <div className="flex w-full xl:w-[80vw] h-[100%] border-def bg-sec xl:flex-row gap-y-4 flex-col rounded-md xl:overflow-hidden overflow-y-auto">
          <div className='xl:w-1/2 w-full px-16 py-8 xl:overflow-y-auto basis-1/2'>
            <h2 className='text-accent h2 font-semibold'>Nutzer Informationen</h2>
              <UserInformaiton info={user} key={1}/>
              <LogoutButton key={2}/>
          </div>
          <div className='xl:w-1/2 w-full px-16 py-8 xl:overflow-y-auto basis-1/2'>
            <h2 className='text-accent h2 font-semibold'>Bankdaten</h2>
            <ul className='flex flex-col gap-4'>
              
              <Plaid user={{id:session.user.id,name,address}} token={linkToken!} removeAccessToken={removeAccess } convertToken={convertToken} accessToken={accessToken} />
                
                <div className='flex flex-row justify-center items-center gap-4'>
                    <form action={async()=>{"use server";await refreshTransactions(id,accessToken,true);}} >
                      <button className='btn-nav text-small text-muted p-4 rounded-xl basis-1/2'>Bereits überprüfte Transaktionen laden</button>
                    </form>
                    <form action={async()=>{"use server";await refreshTransactions(id,accessToken,false); }} >
                      <button className='btn-nav text-small text-muted p-4 rounded-xl basis-1/2'>Neue Transaktionen laden</button>
                    </form>
                  </div>
              {accessToken&&globalThis.TransactionData}
              {globalThis.TransactionData&&globalThis.TransactionData.length>0&& 
              <div className="flex flex-col border-def bg-prim rounded-2xl p-4 ">
                <div className="flex flex-col">
                    <p className="text-tiny text-primary-foreground/70 ">Kategorie & Parteien zu % richtig: </p>
                    <div className="flex flex-row gap-4">
                      <p className='text-small text-green-200'>Grün: {'>'}90%</p> <p className='text-small text-red-200'>Rot: {'<'}90%</p> 
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
  revalidateTag("settings")
}

const convertToken = async (publicToken:string) => {
  "use server"
  const response = await exchangeToken(publicToken)
  return response.access_token
}

const refreshTransactions = async (userId:string,accessToken:string,dontIncludeCursor:boolean) => {
  "use server"
  if(dontIncludeCursor) await removeFromUser(userId,{"cursor":""})
  revalidateTag("settings")
}

const deleteAccount = async (userId:string) => {
  throw {error:"not jet supported"}
}

const getTransactionCards = async(token:string,userId:string) => {
  let added: Array<Transaction> = [];
  let modified: Array<Transaction> = [];
  let addedCard: ReactNode[] = []
  let removed: Array<RemovedTransaction> = [];
  let hasMore = true;
  let cursor = await getLatestCursorOrUndefined(userId);
  while(hasMore){
  const data = await transactionSync(token,userId,cursor)
    added = added.concat(data.added);
    modified = modified.concat(data.modified);
    removed = removed.concat(data.removed);  
    hasMore = data.has_more;
    cursor = data.next_cursor;
    data.added.forEach((data,index)=>{
      addedCard.push(
          <TransactionCard
              key={index}
              counterParties={data.counterparties}
              amount={-data.amount}
              currency={data.iso_currency_code}
              categoryDetailed={data.personal_finance_category?.detailed}
              categoryConfidence={data.personal_finance_category?.confidence_level}
              description={data.original_description}
              date={data.date}
          />
      );
    })
  }
  updateUser(userId,{"cursor":cursor})
  return addedCard
}