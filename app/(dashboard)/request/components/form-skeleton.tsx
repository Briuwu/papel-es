import { Skeleton } from "@/components/ui/skeleton";
export function FormSkeleton() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-7 w-[500px]" />
      <div className="space-y-5">
        <Skeleton className="h-8 w-[300px]" />
        <div className="space-y-2">
          <Skeleton className="h-7 w-5" />
          <Skeleton className="h-8 w-[300px]" />
        </div>
      </div>
    </div>
  );
}
