"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Documents } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

const documentsMap = {
  barangay_id: "Barangay ID",
  barangay_clearance: "Barangay Clearance",
  incident_report: "Incident Report",
};

export const columns: ColumnDef<Documents>[] = [
  {
    accessorKey: "type",
    header: "Document Type",
    cell: ({ row }) => documentsMap[row.original.type],
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Requested Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    // convert the date to a human readable format
    cell: ({ row }) =>
      new Date(row.original.date).toLocaleDateString("default", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <span
          className={cn(
            "rounded-full px-2 py-1 text-xs font-bold text-white",
            status === "processing" && "bg-yellow-500",
            status === "ready" && "bg-green-500",
            status === "rejected" && "bg-red-500",
          )}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction />,
  },
];
