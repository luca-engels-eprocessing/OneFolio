"use client"

import * as React from "react"
import { IconMoon, IconSun } from "@tabler/icons-react"
import { useTheme } from "next-themes"
import { cn } from '@/lib/utils'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Props = {
  className?: string
  iconClass?:string
}

export function ModeToggle(props:Props) {
  const { setTheme} = useTheme()

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className={props.className}>
            <IconSun className={cn("dark:hidden grid rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 ",props.iconClass)}/>
            <IconMoon className={cn("hidden dark:grid rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100",props.iconClass)}/>
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
  )
}
