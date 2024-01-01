import Link from "next/link";
import { User } from "./components/user";
import { Separator } from "@/components/ui/separator";
import { UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <User />
        <Button asChild className="font-bold" variant={"outline"} size={"lg"}>
          <Link href="/profile/edit" className="flex gap-2 items-center">
            <UserCog size={16} />
            <span>Edit Profile</span>
          </Link>
        </Button>
      </div>
      <Separator className="mt-5 h-[2px] bg-black" />
    </>
  );
}
