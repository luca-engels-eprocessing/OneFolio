"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import { useState } from "react"
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react"
import Link from "next/link"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  displayAddSum: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  displayAddSum,
}: DataTableProps<TData, TValue>) {
    
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =useState<VisibilityState>({})
    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility:{addSum:displayAddSum},
        },
        initialState:{
            pagination:{
                pageSize:4
            },
        }
    })

  return (
    <div>
        <div className="flex flex-row justify-between items-center pb-4">
            <div className="flex flex-row gap-2 w-full justify-start">
                <Input
                    placeholder="Such nach Titel"
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                    table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-md"
                />
                {/* <D.DropdownMenu>
                    <D.DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Spalten ausblenden
                        </Button>
                    </D.DropdownMenuTrigger>
                    <D.DropdownMenuContent align="end">
                        {table
                        .getAllColumns()
                        .filter(
                            (column) => column.getCanHide()
                        )
                        .map((column) => {
                            return (
                            <D.DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) =>
                                column.toggleVisibility(!!value)
                                }
                            >
                                {column.id}
                            </D.DropdownMenuCheckboxItem>
                            )
                        })}
                    </D.DropdownMenuContent>
                </D.DropdownMenu> */}
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
                </div>
                <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
            >
                <span className="sr-only">Zur ersten Seite</span>
                <IconChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                <span className="sr-only">Zur vorherigen Seite</span>
                <IconChevronLeft className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                <span className="sr-only">Zur nächsten Seite</span>
                <IconChevronRight className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
            >
                <span className="sr-only">Zur letzten Seite</span>
                <IconChevronsRight className="h-4 w-4" />
            </Button>
            </div>
        </div>
        <div className="rounded-md border-2 border-border bg-secondary">
            <Table>
                <TableHeader className="bg-secondary">
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        return (
                        <TableHead key={header.id} className="p-0 m-0">
                            {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                                )}
                        </TableHead>
                        )
                    })}
                    </TableRow>
                ))}
                </TableHeader>
                <TableBody className="bg-primary">
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="hover:bg-accent group">
                        {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="p-0 m-0 ">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                        ))}
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                    <div className='flex flex-col justify-center'>
                        <h1 className={"text-4xl text-center"}>Keine Investments vorhanden</h1>
                        
                        <Button className='cursor-pointer justify-center' variant={"link"} size={"sm"} asChild>
                            <Link href={"/add"}>
                            <p className={"text-center text-muted-foreground"}>Fügen sie neue Investments hinzu</p>
                            </Link>
                        </Button>
                        </div>
                    </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </div>
    </div>
  )
}
