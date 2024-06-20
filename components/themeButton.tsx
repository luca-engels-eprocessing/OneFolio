"use client"

import * as React from "react"
import { IconMoon, IconSun } from "@tabler/icons-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Props = {
  className?: string
}

export function ModeToggle(props:Props) {
  const { setTheme} = useTheme()

  return (
    <div className={props.className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="btn-nav md:p-4 rounded-lg w-full hover:bg-accent cursor-pointer">
            <IconSun className="dark:hidden grid rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " size={28}/>
            <IconMoon className="hidden dark:grid rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" size={28}/>
            <span className="sr-only">Toggle theme</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="cursor-pointer" onClick={() => {setTheme("light"); console.log("light")}}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
