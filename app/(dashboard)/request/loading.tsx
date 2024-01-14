import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-10">
      <h1 className="text-lg font-bold uppercase sm:text-xl md:text-3xl">
        I am requesting for ...
      </h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        <Skeleton className="h-[239px] w-full" />
        <Skeleton className="h-[239px] w-full" />
        <Skeleton className="h-[239px] w-full" />
      </div>
    </div>
  );
}
