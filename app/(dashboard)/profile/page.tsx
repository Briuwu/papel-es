import { User } from "./components/user";
import { Separator } from "@/components/ui/separator";
import { EditProfile } from "@/app/(dashboard)/profile/components/edit-profile";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { RequestedDocuments } from "./components/table/requested-documents";
import { TableSkeleton } from "./components/table/table-skeleton";

export default async function DashboardPage() {
  return (
    <>
      <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <User />
        <Suspense fallback={<Skeleton className="h-9 w-36 rounded" />}>
          <EditProfile />
        </Suspense>
      </div>
      <Separator className="mt-5 bg-black" />
      <Suspense fallback={<TableSkeleton />}>
        <RequestedDocuments />
      </Suspense>
    </>
  );
}
