"use server"

import {MarketChart} from "@/components/chart"

async function Home() {
  return (
      <main className="h-full w-full flex flex-col gap-8 items-center justify-start  pb-2">
          <div>
              <h1 className={"h1"}>Ihr Portfolio im Überblick</h1>
          </div>
          <div
              className="w-[80vw] bg-sec border-def rounded-xl grid grid-flow-row-dense grid-rows-2 grid-cols-2 gap-16 items-center content-center justify-around">
              <div className={"row-start-1 col-start-1 flex flex-col p-4 content-center justify-center text-center"}>
                  <p className={"text-2xl font-medium"}>Ihre Branchen</p>
                    <MarketChart color="blue" id={"ethereum"}/>
              </div>
              <div className={"row-start-1 col-start-2 flex flex-col p-4 content-center justify-center text-center"}>
                  <p className={"text-2xl font-medium"}>Ihre Sparte</p>
                    <MarketChart color="green" id={"tether"}/>
              </div>
              <div className={"row-start-2 col-start-1 flex flex-col p-4 content-center justify-center text-center"}>
                  <p className={"text-2xl font-medium"}>Laufzeitbindungen</p>
                    <MarketChart color="red" id={"bnb"}/>
              </div>
              <div className={"row-start-2 col-start-2 flex flex-col p-4 content-center justify-center text-center"}>
                  <p className={"text-2xl font-medium"}>Ihre Risikoklassen</p>
                    <MarketChart color="orange" id={"bitcoin"}/>
              </div>
          </div>
      </main>
  );
}

export default Home