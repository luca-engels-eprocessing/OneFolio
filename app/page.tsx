"use server"

import { auth } from "@/auth";
import {MarketChart} from "@/components/chart"
import { getInvestmentsByUserId } from "@/utils/db";
import test from "node:test";

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

  console.log(investments);
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
  console.log("fin",finalData)


  return (
      <main className="h-full w-full flex flex-col gap-8 items-center justify-start  pb-2">
          <div>
              <h1 className={"h1"}>Ihr Portfolio im Überblick</h1>
          </div>
          <div
              className="w-[80vw] bg-sec border-def rounded-xl grid grid-flow-row-dense grid-rows-2 grid-cols-2 gap-16 items-center content-center justify-around">
              <div className={"row-start-1 col-start-1 flex flex-col p-4 content-center justify-center text-center"}>
                  <p className={"text-2xl font-medium"}>Ihre Branchen</p>
                    <MarketChart type="line" color="blue" data={finalData} diagramKey="Branche"/>
              </div>
              <div className={"row-start-1 col-start-2 flex flex-col p-4 content-center justify-center text-center"}>
                  <p className={"text-2xl font-medium"}>Ihre Sparte</p>
                    <MarketChart type="bar" color="green" data={finalData} diagramKey="Branche"/>
              </div>
              <div className={"row-start-2 col-start-1 flex flex-col p-4 content-center justify-center text-center"}>
                  <p className={"text-2xl font-medium"}>Laufzeitbindungen</p>
                    <MarketChart type="pie" color="red" data={finalData} diagramKey="Branche"/>
              </div>
              <div className={"row-start-2 col-start-2 flex flex-col p-4 content-center justify-center text-center"}>
                  <p className={"text-2xl font-medium"}>Ihre Risikoklassen</p>
                    <MarketChart type={"radar"} color="orange" data={finalData} diagramKey="Summe"/>
              </div>
          </div>
      </main>
  );
}

export default Home