import { Skeleton } from "@/components/ui/skeleton";
export function FormSkeleton() {
  return (
    <div className="space-y-5">
      <Skeleton className="w-[500px] h-7" />
      <div className="space-y-5">
        <Skeleton className="w-[300px] h-8" />
        <div className="space-y-2">
          <Skeleton className="w-5 h-7" />
          <Skeleton className="h-8 w-[300px]" />
        </div>
      </div>
    </div>
  );
}
