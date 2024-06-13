import { Roboto } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Roboto({
    weight: ["700"],
    subsets: ["latin"],
});

type Props = {
    label: string
}

export const Header = (props:Props) => {
    return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
        <h1 className={cn("text-big font-semibold",font.className)}>
            {props.label}
        </h1>
    </div>
    )
}