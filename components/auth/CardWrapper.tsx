"use client"

import React, { Children, ReactNode } from "react";
import { Card,CardContent,CardFooter,CardHeader } from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import BackButton from "./BackButton";

type Props = {
    children: ReactNode;
    headerLabel: string;
    backButtonLabel:string;
    backButtonHref:string;
};
export const CardWrapper = (props:Props) => {
    return (
        <Card className="w-[400px] shadow-md bg-secLight dark:bg-secDark border-def p-4">
            <CardHeader>
                <Header label={props.headerLabel} />
            </CardHeader>
            <CardContent className=" rounded-2xl justify-center content-center">
                {props.children}
            </CardContent>
            <CardFooter>
                <BackButton href={props.backButtonHref} label={props.backButtonLabel} />
            </CardFooter>
        </Card>
    )
}