"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

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

  const handleClick = (path: string) => {
    startTransition(() => {
      router.push(`request?opt=${path}`);
    });
  };

  return (
    <>
      {requests.map((request) => (
        <Card
          className={cn(
            "relative z-10",
            request.active && "bg-gray-100 outline outline-blue-400",
            isPending && "pointer-events-none opacity-50",
          )}
          key={request.id}
        >
          <button
            type="button"
            onClick={() => handleClick(request.path)}
            className="flex h-full w-full flex-col items-center justify-between"
          >
            <CardHeader className="text-center">
              <CardTitle>{request.name}</CardTitle>
            </CardHeader>
            <CardContent>{request.icon}</CardContent>
          </button>
        </Card>
      ))}
    </>
  );
}
