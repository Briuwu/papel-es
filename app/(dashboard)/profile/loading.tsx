import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { UserIcon } from "lucide-react";

export default function Loading() {
  return (
    <>
      <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <div className="w-fit rounded-full border-2 border-black p-4">
            <UserIcon className="h-10 w-10 md:h-28 md:w-28" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-9 w-96" />
            <Skeleton className="h-5 w-72" />
          </div>
        </div>
        <Skeleton className="h-9 w-36" />
      </div>
      <Separator className="mt-5 h-[2px] bg-black" />
    </>
  );
}
