import { CheckCircledIcon } from "@radix-ui/react-icons"
import Link from "next/link";
import { Button } from "./ui/button";

type Props = {
    message?: string;
    href?: string;
}

export const FormSuccess = (props:Props)=> {
    if(!props.message) return null;
    return (
        <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
            <CheckCircledIcon className="w-4 h-4" />
            <p>{props.message}</p>
            {props.href&&<Button variant={"link"} className='underline' size="sm" asChild><Link href={props.href}>Jetzt anmelden!</Link></Button>}
        </div>
    )
}