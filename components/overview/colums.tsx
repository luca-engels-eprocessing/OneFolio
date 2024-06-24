"use client";

import { ColumnDef } from "@tanstack/react-table";
import * as D from "../ui/dropdown-menu";
import {
  IconArrowsUpDown,
  IconCodePlus,
  IconLoader2,
  IconTrash,
  IconTrashOff,
} from "@tabler/icons-react";
import { deleteInvestmentById, updateInvestmentById } from "@/utils/db";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Investment = {
  id: string;
  title: string;
  date: string;
  [key: string]: string;
  addSum: string;
};

const DeleteCellComponent = ({ row }: { row: any }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const id: string = row.getValue("id") || "";
  return (
    <button
      disabled={isDeleting}
      className="w-full p-6 flex justify-center items-center"
      onClick={async () => {
        setIsDeleting(true);
        await deleteInvestmentById(id);
        router.refresh();
        setIsDeleting(false);
      }}
    >
      {isDeleting ? (
        <IconTrashOff className="text-secLight/75 dark:text-secDark/75 " />
      ) : (
        <IconTrash className="text-secLight/75 dark:text-secDark/75 " />
      )}
    </button>
  );
};
const AddCellComponent = ({ row }: { row: any }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  return (
    <button
      disabled={isUpdating}
      className="w-full p-6 flex justify-center items-center"
      onClick={async () => {
        setIsUpdating(true);
        const data = {...row.original,"Summe":Number.parseInt(row.original.Summe)+Number.parseInt(row.original.addSum)}
        const {id,addSum,...useful} = data
        console.log(useful)
        await updateInvestmentById(id, { data:useful });
        router.push("/overview");
        setIsUpdating(false);
      }}
    >
      {isUpdating ? (
        <IconLoader2 className="text-secLight/75 dark:text-secDark/75 animate-spin" />
      ) : (
        <IconCodePlus className="text-secLight/75 dark:text-secDark/75 " />
      )}
    </button>
  );
};

export const columns: ColumnDef<Investment>[] = [
  {
    accessorKey: "addSum",
    header: () => <p className="text-center">+</p>,
    cell: AddCellComponent,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-start justify-start items-center flex w-full"
        >
          Titel
          <IconArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title: string = row.getValue("title");
      return (
        <h1 className="pl-2 text-big text-accent font-semibold group-hover:text-accent-foreground group-focus:text-accent-foreground">
          {title}
        </h1>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-center justify-center items-center flex w-full"
        >
          Statdatum
          <IconArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    sortingFn: (rowA, rowB, columnId) => {
      const dateAsnip = rowA.original.date.split(".");
      const dateBsnip = rowB.original.date.split(".");
      const dateA = new Date(+dateAsnip[2], +dateAsnip[1] - 1, +dateAsnip[0]);
      const dateB = new Date(+dateBsnip[2], +dateBsnip[1] - 1, +dateBsnip[0]);
      if (dateA > dateB) return 1;
      if (dateA < dateB) return -1;
      return 0;
    },
    cell: ({ row }) => {
      const date: string = row.getValue("date");
      return (
        <p className="text-center text-medium group-hover:text-accent-foreground group-focus:text-accent-foreground">
          {date}
        </p>
      );
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
      );
    },
    sortingFn: (rowA, rowB, columnId) => {
      return Number.parseInt(rowB.original["Summe"]) - Number.parseInt(rowA.original["Summe"]);
    },
    cell: ({ row }) => {
      console.log("SUMME: ",row.original["Summe"])
      const sum = row.original["Summe"]
      return (
        <p className="text-center text-medium group-hover:text-accent-foreground group-focus:text-accent-foreground">
          {sum}
        </p>
      );
    },
  },
  {
    accessorKey: "details",
    header: () => <p className="text-center">Weitere Informationen</p>,
    cell: ({ row }) => {
      const {date,id,title,addSum,Summe,...details} = row.original
      return (
        
        <D.DropdownMenu>
          <D.DropdownMenuTrigger className="w-full">
            <div className="grid gap-y-4 py-2 items-center text-start xl:grid-rows-2 xl:grid-cols-2 grid-cols-1 w-full">
              {Object.entries(details)
                .slice(0, 3)
                .map(([key, value], index) => (
                  <div key={index} className={index >= 3 ? "hidden" : ""}>
                    <p
                      className={cn(
                        "text-small font-light text-muted-foreground group-hover:text-accent-foreground group-focus:text-accent-foreground",
                        index % 2 == 1 && "text-right"
                      )}
                    >
                      {key}
                    </p>
                    <p
                      className={cn(
                        "text-medium font-normal group-hover:text-accent-foreground group-focus:text-accent-foreground",
                        index % 2 == 1 && "text-right"
                      )}
                    >
                      {value as string}
                    </p>
                  </div>
                ))}

              {Object.entries(details).length >= 4 && (
                <div>
                  <p className="text-small font-light text-muted-foreground group-hover:text-accent-foreground group-focus:text-accent-foreground text-right">
                    Und {Object.entries(details).length - 3} weitere...
                  </p>
                  <p className="text-medium font-normal group-hover:text-accent-foreground group-focus:text-accent-foreground text-right">
                    Anzeigen...
                  </p>
                </div>
              )}
            </div>
          </D.DropdownMenuTrigger>
          <D.DropdownMenuContent className="p-4 bg-secondary">
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
      );
    },
  },
  {
    accessorKey: "id",
    header: () => (
      <p className="text-center pr-4">
        Investment <br /> löschen
      </p>
    ),
    cell: DeleteCellComponent,
  },
];
