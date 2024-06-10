"use client"
import React from 'react'
import Chatbot from "react-chatbot-kit";
import 'react-chatbot-kit/build/main.css'
import config from "@/components/chatbot/config"
import MessageParser from "@/components/chatbot/MessageParser"
import ActionProvider from "@/components/chatbot/ActionProvider"
import { cn } from '@/lib/utils';

export const CB = ({...props}) => {
    return (
        <div className={cn(props.className)}>
            <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} {...props}/>
        </div>
    )
}
