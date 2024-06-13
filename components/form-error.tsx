import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {
    message?: string;
    href?: string;
}

export const FormError = (props:Props)=> {
    if(!props.message) return null;
    return (
        <div className="bg-red-500/15 p-3 rounded-md flex items-center gap-x-2 text-small text-red-500">
            <ExclamationTriangleIcon className="w-4 h-4" />
            <p>{props.message}</p>
            {props.href&&<Button variant={"link"} className='underline' size="sm" asChild><Link href={props.href}>Lieber hier Anmelden!</Link></Button>}
        </div>
    )
}