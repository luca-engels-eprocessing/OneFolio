"use client"
import React from "react"
import { CardWrapper } from "./CardWrapper"
import {useForm} from "react-hook-form"
import * as z from "zod"
import { signInSchema } from "@/utils/zod"

import {zodResolver} from "@hookform/resolvers/zod"

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export const LoginForm = () => {
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })


    return (
        <CardWrapper headerLabel="Wilkommen zurück!" backButtonLabel="Jetzt registrieren" backButtonHref="/auth/register">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(()=>{})} className="space-y-6 py-4">
                    <div className="space-y-4">
                        <FormField control={form.control} name="email" render={({field})=>(
                        <FormItem className=" border-def rounded-lg">
                            <FormLabel className="p-2">E-mail</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="email@example.com" type="email" className="text-black" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>)} />
                        <FormField control={form.control} name="password" render={({field})=>(
                        <FormItem className=" border-def rounded-lg">
                            <FormLabel className="p-2">Password</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="********" type="password" className="text-black" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>)} />
                    </div>
                    <Button className="btn-nav w-full " type="submit">
                        Anmelden
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}