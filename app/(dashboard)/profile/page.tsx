import { User } from "./components/user";
import { Separator } from "@/components/ui/separator";

export default async function DashboardPage() {
  return (
    <>
      <User />
      <Separator className="mt-5 h-[2px] bg-black" />
    </>
  );
}
