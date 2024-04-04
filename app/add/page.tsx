"use client"
export default function page() {
    return (
        <main className="flex h-screen w-screen flex-col gap-16 py-24 pl-48 pr-64">
            <div className={""}>
                <h1 className={"h1"}>Fügen sie ein neues Investment hinzu</h1>
            </div>
            <div className={"flex flex-row overflow-clip gap-32"}>
                <form className={"border-def bg-sec w-fit p-8 flex gap-1 flex-col items-start"}>
                    <button  onClick={(e) => {
                        e.preventDefault();
                        console.log("CLICK")
                    }} className={"btn-nav flex flex-row px-4 py-2 rounded-lg gap-4 justify-center items-center"}>
                        <p className={"rounded-l-lg"}>Test</p>
                        <div className={"h-8 border-r-2 border-accentLight dark:border-accentDark"} />
                        <p className={"rounded-l-lg"}>Hinzufügen</p>
                    </button>
                    <button  onClick={(e) => {
                        e.preventDefault();
                        console.log("CLICK")
                    }} className={"btn-nav flex flex-row px-4 py-2 rounded-lg gap-4 justify-center items-center"}>
                        <p className={"rounded-l-lg"}>Test</p>
                        <div className={"h-8 border-r-2 border-accentLight dark:border-accentDark"} />
                    </button>
                    <button  onClick={(e) => {
                        e.preventDefault();
                        console.log("CLICK")
                    }} className={"btn-nav flex flex-row px-4 py-2 rounded-lg gap-4 justify-center items-center"}>
                        <p className={"rounded-l-lg"}>Test</p>
                        <div className={"h-8 border-r-2 border-accentLight dark:border-accentDark"} />
                    </button>
                    <button  onClick={(e) => {
                        e.preventDefault();
                        console.log("CLICK")
                    }} className={"btn-nav flex flex-row px-4 py-2 rounded-lg gap-4 justify-center items-center"}>
                        <p className={"rounded-l-lg"}>Test</p>
                        <div className={"h-8 border-r-2 border-accentLight dark:border-accentDark"} />
                    </button>
                    <div className={"mt-3"}>
                        <button  onClick={(e) => {
                        e.preventDefault();
                        console.log("CLICK")
                    }} className={"btn-nav border-r-[1px] rounded-l-lg p-2 px-4"}>Hinzufügen</button>
                        <button  onClick={(e) => {
                        e.preventDefault();
                        console.log("CLICK")
                    }} className={"btn-nav border-x-[1px] p-2 px-4"}>Speichern</button>
                        <button  onClick={(e) => {
                        e.preventDefault();
                        console.log("CLICK")
                    }} className={"btn-nav border-l-[1px] rounded-r-lg p-2 px-4"}>Layout sichern</button>
                    </div>
                </form>
                <form className={"flex flex-col gap-2 bg-sec border-def p-8 overflow-y-scroll scroll-light dark:scroll-dark"}>
                    <button  onClick={(e) => {
                        e.preventDefault();
                        console.log("CLICK")
                    }} className={"btn-nav rounded-lg px-4 py-2"}>
                        <p>SOMETHING</p>
                    </button>
                    <button  onClick={(e) => {
                        e.preventDefault();
                        console.log("CLICK")
                    }} className={"btn-nav rounded-lg px-4 py-2"}>
                        <p>SOMETHING</p>
                    </button>
                    <button  onClick={(e) => {
                        e.preventDefault();
                        console.log("CLICK")
                    }} className={"btn-nav rounded-lg px-4 py-2"}>
                        <p>SOMETHING</p>
                    </button>
                    <button  onClick={(e) => {
                        e.preventDefault();
                        console.log("CLICK")
                    }} className={"btn-nav rounded-lg px-4 py-2"}>
                        <p>SOMETHING</p>
                    </button>
                    <button  onClick={(e) => {
                        e.preventDefault();
                        console.log("CLICK")
                    }} className={"btn-nav rounded-lg px-4 py-2"}>
                        <p>SOMETHING</p>
                    </button>
                    <button  onClick={(e) => {
                        e.preventDefault();
                        console.log("CLICK")
                    }} className={"btn-nav rounded-lg px-4 py-2"}>
                        <p>SOMETHING</p>
                    </button>
                    <button  onClick={(e) => {
                        e.preventDefault();
                        console.log("CLICK")
                    }} className={"btn-nav rounded-lg px-4 py-2"}>
                        <p>SOMETHING</p>
                    </button>
                    <button  onClick={(e) => {
                        e.preventDefault();
                        console.log("CLICK")
                    }} className={"btn-nav rounded-lg px-4 py-2"}>
                        <p>SOMETHING</p>
                    </button>
                    <button  onClick={(e) => {
                        e.preventDefault();
                        console.log("CLICK")
                    }} className={"btn-nav rounded-lg px-4 py-2"}>
                        <p>SOMETHING</p>
                    </button>
                    <button  onClick={(e) => {
                        e.preventDefault();
                        console.log("CLICK")
                    }} className={"btn-nav rounded-lg px-4 py-2"}>
                        <p>SOMETHING</p>
                    </button>
                    <button  onClick={(e) => {
                        e.preventDefault();
                        console.log("CLICK")
                    }} className={"btn-nav rounded-lg px-4 py-2"}>
                        <p>SOMETHING</p>
                    </button>
                    <button  onClick={(e) => {
                        e.preventDefault();
                        console.log("CLICK")
                    }} className={"btn-nav rounded-lg px-4 py-2"}>
                        <p>SOMETHING</p>
                    </button>
                    <button  onClick={(e) => {
                        e.preventDefault();
                        console.log("CLICK")
                    }} className={"btn-nav rounded-lg px-4 py-2"}>
                        <p>SOMETHING</p>
                    </button>
                    <button  onClick={(e) => {
                        e.preventDefault();
                        console.log("CLICK")
                    }} className={"btn-nav rounded-lg px-4 py-2"}>
                        <p>SOMETHING</p>
                    </button>
                    <button  onClick={(e) => {
                        e.preventDefault();
                        console.log("CLICK")
                    }} className={"btn-nav rounded-lg px-4 py-2"}>
                        <p>SOMETHING</p>
                    </button>
                    <button  onClick={(e) => {
                        e.preventDefault();
                        console.log("CLICK")
                    }} className={"btn-nav rounded-lg px-4 py-2"}>
                        <p>SOMETHING</p>
                    </button>
                </form>
            </div>
        </main>
    );
}
