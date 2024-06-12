import { cn } from "@/lib/utils";
import { getLatestCursorOrUndefined, updateUser } from "@/utils/db";
import { transactionSync } from "@/utils/plaid";
import { RemovedTransaction, Transaction, TransactionCounterparty } from "plaid";
import { ReactNode } from "react";






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
    var trimString = props.categoryDetailed
    const length = 75
    if(props.categoryDetailed&&props.categoryDetailed.length>length){
        trimString = props.categoryDetailed.substring(0, length);
        trimString = trimString+"..."
    }
    const categoryDetailElement = <p className={cn("text-lg",(props.categoryConfidence === 'HIGH' || props.categoryConfidence === 'VERY_HIGH')?"text-green-500":"text-red-500")}>{trimString}</p>
    const parties:ReactNode[] =[]
    props.counterParties?.forEach((data,index) => {

        const counterPartiesElement = <p key={index} className={cn("text-lg",(data.confidence_level === 'HIGH' || data.confidence_level === 'VERY_HIGH')?"text-green-500":"text-red-500")}>{data.name}</p>
        parties.push(counterPartiesElement)
    })
    
    return (
      <div className="flex flex-col border-def bg-prim rounded-2xl p-4 ">
        <div className="flex flex-row gap-8 w-full justify-between pr-8">
            <div className="flex flex-col basis-1/4">
                <p className="text-sm text-textLight/70 dark:text-textDark/50">Umsatz: </p>
                <div className="flex flex-row gap-1">
                    <p className={cn("text-lg",props.amount<0?"text-red-500":"text-green-500")}>{props.amount>0?"+":""}{props.amount.toLocaleString()}</p>
                    <p className="text-lg">{props.currency}</p>
                </div>
            </div>
            <div className="flex flex-col justify-center text-center basis-1/2">
                <p className="text-sm text-textLight/70 dark:text-textDark/50">Bescheibung: </p>
                <p className="text-lg">{props.description}</p>
            </div>
            
        <div className="flex flex-col justify-end text-end basis-1/4">
            <p className="text-sm text-textLight/70 dark:text-textDark/50">Von: </p>
            <div className="flex flex-row gap-4 justify-end">
            {parties}
            </div>
        </div>
        </div>
        <div className="flex flex-col ">
            <p className="text-sm text-textLight/70 dark:text-textDark/50">Kategorie: </p>
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
    console.log("cursor:",cursor)
    console.log("userId:",userId)
  
    while(hasMore){
      const data = await transactionSync(token,cursor)
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