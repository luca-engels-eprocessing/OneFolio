import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

type Props = {
    message?: string;
}

export const FormError = (props:Props)=> {
    if(!props.message) return null;
    return (
        <div className="bg-red-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-500">
            <ExclamationTriangleIcon className="w-4 h-4" />
            <p>{props.message}</p>
        </div>
    )
}