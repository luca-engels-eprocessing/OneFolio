"use client"
import { cn } from "@/lib/utils";
import { getLatestCursorOrUndefined, removeFromUser, updateUser } from "@/utils/db";
import { removeAccessToken, transactionSync } from "@/utils/plaid_API";
import { useRouter } from "next/navigation";
import { RemovedTransaction, Transaction, TransactionCounterparty } from "plaid";
import { ReactNode, useRef } from "react";
import { Button } from "@/components/ui/button";
import {IconIndentIncrease,IconVariablePlus,IconEyeOff} from "@tabler/icons-react"
import * as T from "@/components/ui/tooltip"
import Link from "next/link";






type TransactionCardProps = {
    amount: number;
    currency: string | null;
    categoryConfidence?: string| null;
    categoryDetailed?: string;
    description?: string | null;
    counterParties?:TransactionCounterparty[];
    date?: string | null;
  };
  
 export const TransactionCard = (props: TransactionCardProps) => {
    var width=1000
    if(typeof window != "undefined"&&window&&window.innerWidth){
      width=window.innerWidth;
    }
    var trimString = props.categoryDetailed
    if(trimString){
      trimString = trimString.replaceAll("_"," ")
    }
    const toHideRef = useRef<HTMLDivElement>(null)

    // const length = 50
    // if(props.categoryDetailed&&props.categoryDetailed.length>length){
    //     trimString = props.categoryDetailed.substring(0, length);
    //     trimString = trimString+"..."
    // }
    const categoryDetailElement = <p className={cn("text-medium",(props.categoryConfidence === 'HIGH' || props.categoryConfidence === 'VERY_HIGH')?"text-green-200":"text-red-200")}>{trimString?.toLocaleLowerCase()}</p>
    const parties:ReactNode[] =[]
    const router = useRouter()
    props.counterParties?.forEach((data,index) => {
        const counterPartiesElement = <p key={index} className={cn("text-medium",(data.confidence_level === 'HIGH' || data.confidence_level === 'VERY_HIGH')?"text-green-200":"text-red-200")}>{data.name}</p>
        parties.push(counterPartiesElement)
    })
    
    return (
      <div className="flex flex-col border-def bg-prim rounded-2xl p-4 text-primary-foreground" ref={toHideRef}>
        <div className="flex flex-row gap-2 w-full justify-end" >
          <T.TooltipProvider>
            <T.Tooltip>
              <T.TooltipTrigger>
                <Button onClick={()=>{
                  const params=new URLSearchParams()
                  params.set('data',JSON.stringify(props))
                  router.push("/add"+'?'+params.toString())
                }}>
                  <IconVariablePlus />
                </Button>
              </T.TooltipTrigger>
              <T.TooltipContent>
                Erstelle ein neues Investment für diese Transaktion
              </T.TooltipContent>
            </T.Tooltip>
            <T.Tooltip>
              <T.TooltipTrigger>
                <Button onClick={()=>{
                  const params=new URLSearchParams()
                  params.set('data',JSON.stringify(props))
                  router.push("/overview"+'?'+params.toString())
                }}>
                  <IconIndentIncrease />
                </Button>
              </T.TooltipTrigger>
              <T.TooltipContent>
                Füge diese Transaktion einem besthehenden Investment hinzu.
              </T.TooltipContent>
            </T.Tooltip>
            <T.Tooltip>
              <T.TooltipTrigger>
                <Button onClick={(e)=>{
                  e.preventDefault()
                  if(toHideRef.current){
                    toHideRef.current.style.display="none"
                  }
                }}>
                  <IconEyeOff />
                </Button>
              </T.TooltipTrigger>
              <T.TooltipContent>
                Ignoriere diese Transaktion
              </T.TooltipContent>
            </T.Tooltip>
          </T.TooltipProvider>
        </div>
        <div className="xl:flex xl:flex-row grid grid-cols-2 xl:gap-8 gap-2 w-full justify-between">
          <div className="flex flex-col basis-1/4 w-full">
              <p className="text-small text-primary-foreground/70 dark:text-primary-foreground/50">Umsatz: </p>
              <div className="flex flex-row gap-1 items-end">
                  <p className={cn("text-medium",props.amount<0?"text-red-500":"text-green-500")}>{props.amount>0?"+":""}{props.amount.toLocaleString()}</p>
                  <p className="text-small ">{props.currency}</p>
              </div>
          </div>
          <div className="flex flex-col basis-1/2 w-full">
              <p className="text-small text-primary-foreground/70 dark:text-primary-foreground/50">Bescheibung: </p>
              <p className="text-medium">{props.description}</p>
          </div>
          <div className="flex flex-col basis-1/4 w-full">

              {parties.length>0&&<><p className="text-small text-primary-foreground/70 dark:text-primary-foreground/50">Von/An: </p>
              <div className="flex flex-row gap-4 xl:justify-start">
              {parties}
              </div></>}
          </div>
        </div>
        <div className="xl:flex xl:flex-row grid grid-cols-2 xl:gap-8 gap-2 w-full justify-start">
          <div className="flex flex-col basis-3/4 w-full">
            <p className="text-small text-primary-foreground/70 dark:text-primary-foreground/50">Kategorie: </p>
            <div className="flex flex-row gap-4">
                {categoryDetailElement}
            </div>
          </div>
          <div className="flex flex-col basis-1/4 w-full">
            <p className="text-small text-primary-foreground/70 dark:text-primary-foreground/50">Datum: </p>
            <div className="flex flex-row gap-4 text-large">
                {props.date}
            </div>
          </div>
        </div>
      </div>
    );
  }
  