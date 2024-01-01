import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

type CardOptionsProps = {
  id: number;
  name: string;
  path: string;
  icon: JSX.Element;
  active: boolean;
};

export function CardOptions({ requests }: { requests: CardOptionsProps[] }) {
  return (
    <>
      {requests.map((request) => (
        <Card
          className={cn(
            "flex flex-col items-center justify-between relative z-10",
            request.active && "bg-gray-100 outline outline-black"
          )}
          key={request.id}
        >
          <CardHeader className="text-center">
            <CardTitle>{request.name}</CardTitle>
          </CardHeader>
          <CardContent>{request.icon}</CardContent>
          <Link href={`?opt=${request.path}`} className="absolute inset-0 z-0">
            <span className="sr-only">{request.name}</span>
          </Link>
        </Card>
      ))}
    </>
  );
}
