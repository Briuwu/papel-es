import { Skeleton } from "@/components/ui/skeleton";
export function TableSkeleton() {
  return (
    <div className="my-10">
      <Skeleton className="h-10 w-full" />
      <div className="mt-5 space-y-5">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
