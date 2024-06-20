
"use client"
import { removeFromUser, updateUser } from '@/utils/db';
import { useRouter } from 'next/navigation'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { usePlaidLink, PlaidLinkOnSuccess, PlaidLinkOnExit, PlaidLinkOnEvent } from 'react-plaid-link';


type Props = {
  user:{id:string,name:{firstname: string; lastname: string},address:{}},
  token:string,
  accessToken:string|undefined,
  convertToken:(publicToken: string) => Promise<string>
  removeAccessToken:(arg:string)=>void,
  children?: ReactNode;
}

const Plaid = (props: Props) => {
  const router = useRouter()
    const [token,setToken] = useState<string>(props.token)

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (publicToken, metadata) => {
        // send public_token to your server
        // https://plaid.com/docs/api/tokens/#token-exchange-flow
        console.log("LOGIN:",publicToken, metadata);
        
        const accessToken = await props.convertToken(publicToken)
        updateUser(props.user.id,{accessToken:accessToken})
        router.refresh()
      }, [props, router]);
      const onExit = useCallback<PlaidLinkOnExit>((publicToken, metadata) => {
        // send public_token to your server
        // https://plaid.com/docs/api/tokens/#token-exchange-flow
        console.log("EXIT:",publicToken, metadata);
      }, []);
      const onEvent = useCallback<PlaidLinkOnEvent>((publicToken, metadata) => {
        // send public_token to your server
        // https://plaid.com/docs/api/tokens/#token-exchange-flow
        console.log("EVENT:",publicToken, metadata);
      }, []);

      useEffect(() => {
        setToken(props.token)
      }, [props.token]);

    const { open, ready,exit,error } = usePlaidLink({
      token,
      onSuccess,
      onEvent,
      onExit,
    });

  return (
    <div className=' rounded-2xl p-4 flex flex-row justify-center btn-nav'>
      {props.accessToken?
        <div className='flex flex-row justify-evenly items-center w-full'>
          <button onClick={()=>{
            if(props.accessToken){
              removeFromUser(props.user.id,{"accessToken":props.accessToken})
              removeFromUser(props.user.id,{"cursor":""})
              props.removeAccessToken(props.accessToken)
              router.refresh()
            }
            }}>
              <p className='text-medium text-primary-foreground/70 dark:text-primary-foreground/50'>Sie sind mit ihrem Bankkonto verbunden</p>
              <p className='text-big text-primary-foreground dark:text-primary-foreground/70'> Bankverbindung wieder auflösen?</p>
          </button>
          {props.children}
        </div>
        :
        <button className='w-full' onClick={() =>{open()}} disabled={!ready}>
            <p className='text-medium text-primary-foreground/70 dark:text-primary-foreground/50'>Noch keine Bankdaten vorhanden</p>
            <p className='text-big underline text-green-500/50'> Jetzt Bankkonto verbinden</p>
            <p className='text-tiny'>Sandbox-Daten:</p>
            <p className='text-tiny'>username: &apos;user_good&apos;</p>
            <p className='text-tiny'>password: &apos;pass_good&apos;</p>
            <p className='text-tiny'>auth_code: &apos;1234&apos;</p>
        </button>
      }
    </div>
  )
}

export default Plaid

