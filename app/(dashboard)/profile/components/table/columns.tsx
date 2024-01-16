"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Documents } from "@/types";
import { cn } from "@/lib/utils";

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
    header: "Requested Date",
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
