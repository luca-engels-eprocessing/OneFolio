"use client"

import { ColumnDef } from "@tanstack/react-table"
import * as D from "../ui/dropdown-menu"
import { IconArrowsUpDown, IconTrash, IconTrashOff } from "@tabler/icons-react"
import { deleteInvestmentById } from "@/utils/db"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Investment = {
  id: string
  title: string
  details: {[key:string]:any}
  date: string
}


const CellComponent = ({row}: { row: any }) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()
    const id:string = row.getValue("id")||""
    return (
        <div className="w-full flex justify-end items-end content-end">
            <button disabled={isDeleting} onClick={async() => {
                setIsDeleting(true)
                await deleteInvestmentById(id)
                router.refresh()
                setIsDeleting(false)
                }}>
                {isDeleting?<IconTrashOff className='text-secLight/75 dark:text-secDark/75 ' />:<IconTrash />}
            </button>
        </div>
    )
}

export const columns: ColumnDef<Investment>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-start justify-start items-start flex w-full"
          >
            Titel
            <IconArrowsUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({row}) => {
        const title:string =row.getValue("title")
        return (
          <h1 className="text-big text-accent font-semibold group-hover:text-accent-foreground group-focus:text-accent-foreground">
            {title}
          </h1>
        )
    }
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-center justify-center flex w-full"
          >
            Statdatum
            <IconArrowsUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      
      sortingFn: (rowA,rowB,columnId) => {
        const dateAsnip = rowA.original.date.split(".")
        const dateBsnip = rowB.original.date.split(".")
        const dateA = new Date(+dateAsnip[2],+dateAsnip[1]-1,+dateAsnip[0])
        const dateB = new Date(+dateBsnip[2],+dateBsnip[1]-1,+dateBsnip[0])
        if (dateA>dateB) return 1
        if (dateA<dateB) return -1
        return 0
        // return dateA - dateB
        // return  rowB.original.details["Summe"]- rowA.original.details["Summe"]
      },
    cell: ({row}) => {
        const date:string = row.getValue("date")
        return (
          <p className="text-center text-medium group-hover:text-accent-foreground group-focus:text-accent-foreground">
            {date}
          </p>
        )
    },
  },
  {
    accessorKey: "sum",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-center justify-center flex w-full"
          >
            Investitionssumme
            <IconArrowsUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      sortingFn: (rowA,rowB,columnId) => {
        return  rowB.original.details["Summe"]- rowA.original.details["Summe"]
      },
    cell: ({row}) => {
        const details:{[key:string]:any} = row.getValue("details")
        const sum = details["Summe"]
        return (
          <p className="text-center text-medium group-hover:text-accent-foreground group-focus:text-accent-foreground">
            {sum}
          </p>
        )
    },
  },
  {
    accessorKey: "details",
    header: () => <p className="text-center">Weitere Informationen</p>,
    cell: ({row}) => {
        const details:{} = row.getValue("details")
        return (
          <D.DropdownMenu>
            <D.DropdownMenuTrigger className="w-full">
                <div className="grid gap-y-4 items-center text-start xl:grid-rows-2 xl:grid-cols-2 grid-cols-1 w-full">
                    {Object.entries(details).slice(0, 3).map(([key, value], index) => (
                    <div key={index} className={index >= 3 ? "hidden" : ""}>
                        <p className={cn("text-small font-light text-muted-foreground group-hover:text-accent-foreground group-focus:text-accent-foreground",index%2==1&&"text-right")}>{key}</p>
                        <p className={cn("text-medium font-normal group-hover:text-accent-foreground group-focus:text-accent-foreground",index%2==1&&"text-right")}>{value as string}</p>
                    </div>
                    ))}

                    {Object.entries(details).length>=4&&<div>
                        <p className="text-small font-light text-muted-foreground group-hover:text-accent-foreground group-focus:text-accent-foreground text-right">Und {Object.entries(details).length-3} weitere...</p>
                        <p className="text-medium font-normal group-hover:text-accent-foreground group-focus:text-accent-foreground text-right">Anzeigen...</p>
                    </div>}
                </div>
            </D.DropdownMenuTrigger>
            <D.DropdownMenuContent className="p-4 bg-primary">
                <div className="grid gap-4 items-center text-start xl:grid-cols-3 grid-cols-1 w-full">
                    {Object.entries(details).map(([key, value], index) => (
                    <div key={index}>
                        <p className="text-small font-light">{key}</p>
                        <p className="text-medium font-normal">{value as string}</p>
                    </div>
                    ))}
                </div>
            </D.DropdownMenuContent>
          </D.DropdownMenu>
        )
    },
  },
  {
    accessorKey:'id',
    header: () => <p className="text-right">Investment löschen</p>,
    cell: CellComponent,
  }
]