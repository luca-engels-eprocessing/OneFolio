"use server"

import { auth } from "@/auth";
import {MarketChart} from "@/components/chart"
import { getInvestmentsByUserId, getUserById } from "@/utils/db";


async function Home() {
  const session = await auth()

  if(!session || !session.user || !session.user.id){
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full border-4 border-solid border-current border-r-transparent h-12 w-12"></div>
      </div>
    )
  }

  const inv = await getInvestmentsByUserId(session.user.id);
  if (!inv) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full border-4 border-solid border-current border-r-transparent h-12 w-12"></div>
      </div>
    );
  }
  const investments:{[key:string]:string}[] = inv.map((data: { data: any; }) => data.data);
  const totalSum = investments.reduce((previous:number,current:{[key:string]:string}) => {return previous + Number.parseInt(current["Summe"] || "0");}, 0);
  const amountRendite = investments.reduce((previous:number,current:{[key:string]:string}) => {return previous + Number.parseInt(current["Rendite"]?'1':'0');}, 0);
  const averageRendite = Math.round(investments.reduce((previous:number,current:{[key:string]:string}) => {return previous + Number.parseInt(current["Rendite"]||'0');}, 0)/amountRendite);
  // const totalSum = investments.reduce((acc: number, cur: any[]) => acc + Number.parseInt(cur.find((data: { key: string; }) => (data.key as string).toLowerCase().includes("summe"))?.value || "0"), 0);
  // const totalRendite = investments.reduce((acc: number, cur: any[]) => acc + (cur.find((data: { key: string; }) => (data.key as string).toLowerCase().includes("rendite"))?1:0), 0)
  // const averageRendite = Math.round(investments.reduce((acc: number, cur: any[]) => acc + Number.parseInt(cur.find((data: { key: string; }) => (data.key as string).toLowerCase().includes("rendite"))?.value || "0"), 0)/totalRendite);

  return (
    <main className="w-full flex flex-col gap-8 items-center justify-start pb-2 px-4 xl:py-0">
        <div>
          <h1 className={"h1"}>Dein Portfolio im Überblick</h1>
        </div>
        <div className="flex xl:flex-row-reverse flex-col gap-8 w-full xl:w-[80vw] justify-between">
          <div className="p-4 xl:w-[10vw] w-auto border-def rounded-xl bg-sec flex flex-col justify-between">
            <p className="text-small">Das könnte sie interessieren</p>
            <p>Werbung</p>
          </div>
          <div className="xl:w-[60vw] border-def rounded-md bg-sec p-8 xl:grid grid-flow-row-dense xl:grid-rows-2 xL:grid-cols-2 flex flex-col gap-16 items-center content-center justify-around">
            <div className={"row-start-1 col-start-1 flex flex-col p-4 content-center justify-center text-center"}>
              Gesamtinvestition: {totalSum}€<br/>
              Durchschnittsrendite: ~{averageRendite}% über {amountRendite} {amountRendite!=1?" Investments ":" Investment "}verteilt
            </div>
            <div className={"row-start-1 col-start-2 flex flex-col p-4 content-center justify-center text-center"}>
              <MarketChart type="pie" forKey={"ret"} data={investments}/>
            </div>
            <div className={"row-start-2 col-start-1 flex flex-col p-4 content-center justify-center text-center"}>
              <MarketChart type="pie" forKey={"sum"} data={investments}/>
            </div>
            <div className={"row-start-2 col-start-2 flex flex-col p-4 content-center justify-center text-center"}>
              <MarketChart type="pie" forKey={"risk"} data={investments}/>
            </div>
          </div>
        </div>
    </main>
  );
}



export default Home