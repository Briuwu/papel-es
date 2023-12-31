import { Button } from "@/components/ui/button";
import { handleLogout } from "../actions";
import { cn } from "@/lib/utils";

export default function LogoutButton({ className }: { className?: string }) {
  return (
    <form action={handleLogout} className={cn("hidden md:block", className)}>
      <Button size={"sm"} variant={"destructive"} className="font-bold">
        Logout
      </Button>
    </form>
  );
}
