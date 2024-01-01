import { User } from "./components/user";
import { Separator } from "@/components/ui/separator";
import { EditProfile } from "@/app/(dashboard)/profile/components/edit-profile";

export default async function DashboardPage() {
  return (
    <>
      <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <User />
        <EditProfile />
      </div>
      <Separator className="mt-5 h-[2px] bg-black" />
    </>
  );
}
