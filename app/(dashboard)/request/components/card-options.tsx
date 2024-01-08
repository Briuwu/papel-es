"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import Link from "next/link";

type CardOptionsProps = {
  id: number;
  name: string;
  path: string;
  icon: JSX.Element;
  active: boolean;
};

export function CardOptions({ requests }: { requests: CardOptionsProps[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      {requests.map((request) => (
        <Card
          className={cn(
            "relative z-10 flex flex-col items-center justify-between",
            request.active && "bg-gray-100 outline outline-blue-400",
            isPending && "pointer-events-none opacity-50",
          )}
          key={request.id}
        >
          <CardHeader className="text-center">
            <CardTitle>{request.name}</CardTitle>
          </CardHeader>
          <CardContent>{request.icon}</CardContent>
          <Link
            type="button"
            className="absolute inset-0 z-20"
            href={`?opt=${request.path}`}
            disabled={isPending}
          >
            <span className="sr-only">{request.name}</span>
          </Link>
        </Card>
      ))}
    </>
  );
}
