"use server"
import React from 'react'

type Props = {}

async function Settings({}: Props) {
  return (
    <main className="flex h-full w-full flex-col gap-16 py-24 xl:pl-48 px-16">
        <div>
            <h1 className={"h1"}>Ihre Einstellungen</h1>
        </div>
        
        <div className="h-full w-full bg-sec border-def rounded-xl grid grid-flow-row-dense grid-rows-2 grid-cols-2 gap-16 items-center content-center justify-around">
            TEST
        </div>
    </main>
  )
}

export default Settings