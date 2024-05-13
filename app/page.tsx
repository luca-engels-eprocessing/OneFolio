"use server"

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
                  <div
                      className={"border-def-hover w-full h-48 bg-[url('/graphs/meta-chart.png')] bg-contain bg-top bg-no-repeat hover:shadow-[5px_5px_10px_5px_rgba(0,0,0,0.2)] dark:shadow"}>
                  </div>
              </div>
              <div className={"row-start-1 col-start-2 flex flex-col p-4 content-center justify-center text-center"}>
                  <p className={"text-2xl font-medium"}>Ihre Sparte</p>
                  <div
                      className={"border-def-hover w-full h-48 bg-[url('/graphs/meta-chart(1).png')] bg-contain bg-top bg-no-repeat hover:shadow-[5px_5px_10px_5px_rgba(0,0,0,0.2)] dark:shadow"}>
                  </div>
              </div>
              <div className={"row-start-2 col-start-1 flex flex-col p-4 content-center justify-center text-center"}>
                  <p className={"text-2xl font-medium"}>Laufzeitbindungen</p>
                  <div
                      className={"border-def-hover w-full h-48 bg-[url('/graphs/meta-chart(3).png')] bg-contain bg-top bg-no-repeat hover:shadow-[5px_5px_10px_5px_rgba(0,0,0,0.2)] dark:shadow"}>
                  </div>
              </div>
              <div className={"row-start-2 col-start-2 flex flex-col p-4 content-center justify-center text-center"}>
                  <p className={"text-2xl font-medium"}>Ihre Risikoklassen</p>
                  <div
                      className={"border-def-hover w-full h-48 bg-[url('/graphs/meta-chart(4).png')] bg-contain bg-top bg-no-repeat hover:shadow-[5px_5px_10px_5px_rgba(0,0,0,0.2)] dark:shadow"}>
                  </div>
              </div>
          </div>
      </main>
  );
}

export default Home