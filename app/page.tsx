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
  const investments = inv.map(data => data.data.data);
  let finalData: {[key: string]: any[][]} = {};
  
  if (!inv || !investments) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full border-4 border-solid border-current border-r-transparent h-12 w-12"></div>
      </div>
    );
  }

  investments.forEach(investment => {
    investment.forEach(data => {
      if(finalData[data.key]){
        const retList:any[][] = []
        let wasNotAdded = true
        finalData[data.key].forEach(containValue => {
          if(containValue[0]===data.value){
            wasNotAdded = false
            containValue[1] += 1
          }
          retList.push(containValue)
        })
        wasNotAdded?finalData = {...finalData,[data.key]:[...retList,[data.value,1]]}:finalData = {...finalData,[data.key]:[...retList]}
      }
      else{
        finalData = {...finalData,[data.key]: [[data.value,1]]}
      }
    })
  })


  return (
      <main className="h-full w-full flex flex-col gap-8 items-center justify-start  pb-2">
          <div>
              <h1 className={"h1"}>Dein Portfolio im Überblick</h1>
          </div>
          <div className="flex flex-row-reverse gap-8">
            <div className="p-4 w-[10vw] border-def rounded-xl bg-sec flex flex-col justify-between border-l-borderLight dark:border-l-borderDark border-l-2">
              <p className="text-sm">Das könnte sie interessieren</p>
              <p>Werbung</p>
            </div>
            <div
                className="w-[60vw] border-def rounded-xl bg-sec p-8 grid grid-flow-row-dense grid-rows-2 grid-cols-2 gap-16 items-center content-center justify-around">
                <div className={"row-start-1 col-start-1 flex flex-col p-4 content-center justify-center text-center"}>
                      HARD FACTS <br/> Durchschnittsrendite <br/> Gesamtinvestition 
                </div>
                <div className={"row-start-1 col-start-2 flex flex-col p-4 content-center justify-center text-center"}>
                      <MarketChart type="bar" data={finalData} diagramKey="Sparte"/>
                </div>
                <div className={"row-start-2 col-start-1 flex flex-col p-4 content-center justify-center text-center"}>
                      HARD FACTS <br/> Durchschnittsrendite <br/> Gesamtinvestition 
                </div>
                <div className={"row-start-2 col-start-2 flex flex-col p-4 content-center justify-center text-center"}>
                      HARD FACTS <br/> Durchschnittsrendite <br/> Gesamtinvestition 
                </div>
            </div>
          </div>
      </main>
  );
}



export default Home