"use client"
import React, { useState, useTransition } from "react"
import { CardWrapper } from "./CardWrapper"
import {useForm} from "react-hook-form"
import * as z from "zod"
import { signInSchema } from "@/utils/zod"
import { IconPassword } from "@tabler/icons-react"

import {zodResolver} from "@hookform/resolvers/zod"

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { login } from "@/utils/login"


export const LoginForm = () => {
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })
    const onSubmit = (values: z.infer<typeof signInSchema>) => {
        setError("")
        setSuccess("")
        startTransition(()=> {
            login(values).then(data=>{
                setError(data.error)
                setSuccess(data.success)
            })
        })
    }


    return (
        <CardWrapper headerLabel="Jetzt anmelden!" backButtonLabel="Jetzt registrieren" backButtonHref="/auth/register">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
                    <div className="space-y-4">
                        <FormField control={form.control} name="email" render={({field})=>(
                        <FormItem>
                            <FormLabel className="p-2">E-mail</FormLabel>
                            <FormControl className=" border-def rounded-lg">
                                <Input {...field} disabled={isPending} placeholder="email@example.com" type="email" className="text-black" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>)} />
                        <FormField control={form.control} name="password" render={({field})=>(
                        <FormItem>
                            <FormLabel className="p-2">Password</FormLabel>
                            <FormControl className=" border-def rounded-lg">
                                <Input {...field} disabled={isPending} placeholder="********" type="password" className="text-black" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>)} />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button disabled={isPending} className="btn-nav w-full " type="submit">
                        Anmelden
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}