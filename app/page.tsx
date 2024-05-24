"use server"

import { auth } from "@/auth";
import {MarketChart} from "@/components/chart"
import { getInvestmentsByUserId } from "@/utils/db";
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
  const investments = inv.map(data => data.data.data);
  const totalSum = investments.reduce((acc, cur) => acc + Number.parseInt(cur.find(data => data.key === "Summe")?.value || "0"), 0);
  const averageRendite = Math.round(investments.reduce((acc, cur) => acc + Number.parseInt(cur.find(data => data.key === "Rendite (in %)")?.value || "0"), 0)/investments.length);
  console.log("SUM: ",totalSum)
  console.log("AVG: ",averageRendite)

  return (
      <main className="w-full flex flex-col gap-8 items-center justify-start pb-2">
          <div>
              <h1 className={"h1"}>Dein Portfolio im Überblick</h1>
          </div>
          <div className="flex xl:flex-row-reverse flex-col gap-8">
            <div className="p-4 xl:w-[10vw] w-auto border-def rounded-xl bg-sec flex flex-col justify-between border-l-borderLight dark:border-l-borderDark border-l-2">
              <p className="text-sm">Das könnte sie interessieren</p>
              <p>Werbung</p>
            </div>
            <div
                className="w-[60vw] border-def rounded-xl bg-sec p-8 xl:grid grid-flow-row-dense xl:grid-rows-2 xL:grid-cols-2 flex flex-col gap-16 items-center content-center justify-around">
                <div className={"row-start-1 col-start-1 flex flex-col p-4 content-center justify-center text-center"}>
                      HARD FACTS <br/> Durchschnittsrendite <br/> Gesamtinvestition 
                </div>
                <div className={"row-start-1 col-start-2 flex flex-col p-4 content-center justify-center text-center"}>
                      Durchschnittsrendite: ~{averageRendite}%
                </div>
                <div className={"row-start-2 col-start-1 flex flex-col p-4 content-center justify-center text-center"}>
                      <MarketChart type="pie" data={investments} diagramKey="Branche"/>
                </div>
                <div className={"row-start-2 col-start-2 flex flex-col p-4 content-center justify-center text-center"}>
                      Gesamtinvestition: {totalSum}€
                </div>
            </div>
          </div>
      </main>
  );
}



export default Home