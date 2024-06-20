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

export function ModeToggle() {
  const { setTheme,theme} = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <a className="btn-nav md:p-4 p-1 rounded-3xl w-full hover:bg-accent cursor-pointer">
          {theme=="light"?
            <IconSun size={32}/>:
            <IconMoon size={32}/>
          }
          <span className="sr-only">Toggle theme</span>
        </a>
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
