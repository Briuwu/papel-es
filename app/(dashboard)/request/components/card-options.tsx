"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

type CardOptionsProps = {
  id: number;
  name: string;
  path: string;
  icon: JSX.Element;
  active: boolean;
};

export function CardOptions({ requests }: { requests: CardOptionsProps[] }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSwitchTab = (path: string) => {
    startTransition(() => {
      router.push(`/request?opt=${path}#form`);
    });
  };

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
          <button
            type="button"
            className="absolute inset-0"
            onClick={() => onSwitchTab(request.path)}
            disabled={isPending}
          >
            <span className="sr-only">{request.name}</span>
          </button>
        </Card>
      ))}
    </>
  );
}
