'use client'
import { signOut , useSession } from "next-auth/react";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
type Props = {
    mode?: "modal" | "redirect",
    asChild?: boolean;
}


export const LogoutButton = (props:Props) => {
    const { data: session , status } = useSession();
    const router = useRouter();
    
    const onClick = () => {
        router.push("/auth/login")
    }

    if (status === "authenticated" && session && session.user) {
        return (
            <div className="flex flex-col my-2" key={"-1"}>
                <button className="lg:p-4 p-2 btn-nav xl:my-2 my-1 font-light text-small xl:rounded-2xl rounded-md" onClick={() => signOut()}>
                    <p className="text-textLight/70 dark:text-textDark/70">Sie sind eingeloggt.</p>
                    <span className="font-normal text-big">Ausloggen?</span>
                </button>
            </div>
        )
    }
    return (
        <span onClick={onClick} className="cursor-pointer">
            <div className="flex flex-col">
                <button className="lg:p-4 p-0 btn-nav font-normal text-big rounded-2xl text-center">Laden...</button>
              </div>
        </span>
    )
}
function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState<{ width: number, height: number }>()
    
    useEffect(() => {
        // only execute all the code below in client side
        // Handler to call on window resize
      function handleResize() {
          // Set window width/height to state
          setWindowSize({
              width: window.innerWidth,
              height: window.innerHeight,
          });
      }
  
      // Add event listener
      window.addEventListener("resize", handleResize);
  
      // Call handler right away so state gets updated with initial window size
      handleResize();
        
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
      }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }

const LiItem = ({name:key,value:value,index:index}:{name: string,value:any,index:number}) => {
    const size = useWindowSize()

    if (typeof value === "object" && value != null){
        const entry : ReactNode[] = []
        Object.entries(value).map(([keyInner,valueInner]: [string, unknown],indexInner)=>{
            if(size?.width && size.width < 640 && valueInner && typeof valueInner === "string" && valueInner.length>9){
                valueInner = valueInner.substring(0,7)+"..."
            }
            entry.push(<LiItem name={keyInner} value={valueInner as string} index={(index)+(indexInner/10.0)} key={(index)+(indexInner/10.0)}/>)
        });
        return <div className="grid grid-cols-2 xl:gap-x-4 gap-x-1" key={index}>{entry}</div>
    }
    switch (key) {
        case "email":
            key="E-mail"
            break;
        case "firstname":
            key="Vorname"
            break;
        case "name":
            key="Name"
            break;
        case "lastname":
            key="Nachname"
            break;
        case "streetnumber":
            key="Hausnummer"
            break;
        case "zip":
            key="Postleitzahl"
            break;
        case "street":
            key="Straße"
            break;
        case "city":
            key="Stadt"
            break;
        case "country":
            key="Land"
            break;
        case "phone":
            key="Telefon"
            break;
        default:
            break;
    }
        if(size?.width && size.width < 640 && typeof value === "string"&&value.length>18){
            value = value.substring(0,14)+"..."
        }
    return (
        <div className='lg:p-4 p-2 btn-nav xl:my-2 my-1 font-light text-small xl:rounded-2xl rounded-md'><p className="text-textLight/70 dark:text-textDark/50" key={index}>{key + ":"}</p>
            <span className={cn(value?'text-textLight dark:text-textDark':'text-textLight/50 dark:text-textDark/50','font-normal text-big')}>{value?value:(
                (size?.width && size.width < 410)?"Jetzt +":"Jetzt Hinzufügen!"
            )}</span>
        </div>
    )
}

export const UserInformaiton = ({info}:{info:{}|null}) => {

    if (!info) {
        return (
            <div></div>
        )
    }
    var c: ReactNode[] = []
    Object.entries(info).map(([key, value],index) => {
        c.push(<LiItem name={key} value={value} index={index} key={index}/>)
    })
    return <>
        {c}
    </>

}
