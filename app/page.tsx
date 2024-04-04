export default function Home() {
  return (
      <main className="flex h-full w-full flex-col gap-16 py-24 pl-48 pr-64">
          <div>
              <h1 className={"h1"}>Ihr Portfolio im Überblick</h1>
          </div>
          <div
              className="h-full w-full grid grid-flow-row-dense grid-rows-2 grid-cols-2 gap-16 items-center content-center justify-around">
              <div className={"row-start-1 col-start-1 flex flex-col p-4 content-center justify-center text-center"}>
                  <p className={"text-2xl font-medium"}>Ihre Branchen</p>
                  <div
                      className={"border-def w-full h-48 bg-red-700 hover:shadow-[5px_5px_10px_5px_rgba(0,0,0,0.2)] dark:shadow"}>
                      <p>GRAPH 1 HERE</p>
                  </div>
              </div>
              <div className={"row-start-1 col-start-2 flex flex-col p-4 content-center justify-center text-center"}>
                  <p className={"text-2xl font-medium"}>Ihre Sparte</p>
                  <div
                      className={"border-def w-full h-48 bg-green-700 hover:shadow-[5px_5px_10px_5px_rgba(0,0,0,0.2)] dark:shadow"}>
                      <p>GRAPH 1 HERE</p>
                  </div>
              </div>
              <div className={"row-start-2 col-start-1 flex flex-col p-4 content-center justify-center text-center"}>
                  <p className={"text-2xl font-medium"}>Anlagemöglichkeiten</p>
                  <div
                      className={"border-def w-full h-48 bg-blue-700 hover:shadow-[5px_5px_10px_5px_rgba(0,0,0,0.2)] dark:shadow"}>
                      <p>GRAPH 1 HERE</p>
                  </div>
              </div>
              <div className={"row-start-2 col-start-2 flex flex-col p-4 content-center justify-center text-center"}>
                  <p className={"text-2xl font-medium"}>Ihre Risikoauswertung</p>
                  <div
                      className={"border-def w-full h-48 bg-yellow-700 hover:shadow-[5px_5px_10px_5px_rgba(0,0,0,0.2)] dark:shadow"}>
                      <p>GRAPH 1 HERE</p>
                  </div>
              </div>
          </div>
      </main>
  );
}
