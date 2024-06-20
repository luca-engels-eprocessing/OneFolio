import { cn } from "@/lib/utils";
import { getLatestCursorOrUndefined, removeFromUser, updateUser } from "@/utils/db";
import { removeAccessToken, transactionSync } from "@/utils/plaid_API";
import { useRouter } from "next/navigation";
import { RemovedTransaction, Transaction, TransactionCounterparty } from "plaid";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/themeButton";
import * as T from "@/components/ui/tooltip"






type TransactionCardProps = {
    amount: number;
    currency: string | null;
    categoryConfidence?: string| null;
    categoryDetailed?: string;
    description?: string | null;
    counterParties?:TransactionCounterparty[]
  };
  
  const TransactionCard = (props: TransactionCardProps) => {
    "use client"
    var width=1000
    if(typeof window != "undefined"&&window&&window.innerWidth){
      width=window.innerWidth;
    }
    var trimString = props.categoryDetailed
    if(trimString){
      trimString = trimString.replaceAll("_"," ")
    }
    // const length = 50
    // if(props.categoryDetailed&&props.categoryDetailed.length>length){
    //     trimString = props.categoryDetailed.substring(0, length);
    //     trimString = trimString+"..."
    // }
    const categoryDetailElement = <p className={cn("xl:text-2xl lg:text-base text-xs",(props.categoryConfidence === 'HIGH' || props.categoryConfidence === 'VERY_HIGH')?"text-green-200":"text-red-200")}>{trimString?.toLocaleLowerCase()}</p>
    const parties:ReactNode[] =[]
    props.counterParties?.forEach((data,index) => {

        const counterPartiesElement = <p key={index} className={cn("xl:text-2xl lg:text-base text-xs",(data.confidence_level === 'HIGH' || data.confidence_level === 'VERY_HIGH')?"text-green-200":"text-red-200")}>{data.name}</p>
        parties.push(counterPartiesElement)
    })
    
    return (
      <div className="flex flex-col border-def bg-prim rounded-2xl p-4 text-primary-foreground">
        <div className="flex flex-row gap-2 w-full justify-end" >
          <T.TooltipProvider>
            <T.Tooltip>
              <T.TooltipTrigger>
                <Button>
                  Neu
                </Button>
              </T.TooltipTrigger>
              <T.TooltipContent>
                Erstelle ein neues Investment für diese Transaktion
              </T.TooltipContent>
            </T.Tooltip>
            <T.Tooltip>
              <T.TooltipTrigger>
                <Button>
                  Hinzufügen
                </Button>
              </T.TooltipTrigger>
              <T.TooltipContent>
                Füge diese Transaktion einem besthehenden Investment hinzu.
              </T.TooltipContent>
            </T.Tooltip>
            <T.Tooltip>
              <T.TooltipTrigger>
                <Button>
                  Ignorieren
                </Button>
              </T.TooltipTrigger>
              <T.TooltipContent>
                Ignoriere diese Transaktion
              </T.TooltipContent>
            </T.Tooltip>
          </T.TooltipProvider>
        </div>
        <div className="xl:flex xl:flex-row grid grid-cols-2 xl:gap-8 gap-2 w-full justify-between xl:pr-8">
          <div className="flex flex-col basis-1/4">
              <p className="text-small text-primary-foreground/70 dark:text-primary-foreground/50">Umsatz: </p>
              <div className="flex flex-row gap-1 items-end">
                  <p className={cn("xl:text-2xl lg:text-base text-xs",props.amount<0?"text-red-500":"text-green-500")}>{props.amount>0?"+":""}{props.amount.toLocaleString()}</p>
                  <p className="text-medium ">{props.currency}</p>
              </div>
          </div>
          <div className="flex flex-col justify-center text-center basis-1/2">
              <p className="text-small text-primary-foreground/70 dark:text-primary-foreground/50">Bescheibung: </p>
              <p className="xl:text-2xl lg:text-base text-xs">{props.description}</p>
          </div>
          <div className="flex flex-col justify-start xl:text-end basis-1/4">

              {parties.length>0&&<><p className="text-small text-primary-foreground/70 dark:text-primary-foreground/50">Von/An: </p>
              <div className="flex flex-row gap-4 xl:justify-end">
              {parties}
              </div></>}
          </div>
        </div>
        <div className="flex flex-col ">
            <p className="text-small text-primary-foreground/70 dark:text-primary-foreground/50">Kategorie: </p>
            <div className="flex flex-row gap-4">
                {categoryDetailElement}
            </div>
        </div>
      </div>
    );
  }
  
  export const getTransactionCards = async(token:string,userId:string) => {
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
            />
        );
      })
    }
    updateUser(userId,{"cursor":cursor})
    return addedCard
  }