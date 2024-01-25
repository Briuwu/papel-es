"use client";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const statuses = [
  {
    id: 1,
    name: "all",
  },
  {
    id: 2,
    name: "processing",
  },
  {
    id: 3,
    name: "ready",
  },
  {
    id: 4,
    name: "rejected",
  },
];

type StatusFilterProps = {
  setStatus: (status: string) => void;
};

export function StatusFilter({ setStatus }: StatusFilterProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>
          Filter by Status <Filter className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {statuses.map((statusItem) => (
          <DropdownMenuItem
            key={statusItem.id}
            onClick={() => setStatus(statusItem.name)}
          >
            {statusItem.name.toUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
