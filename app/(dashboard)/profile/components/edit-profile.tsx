import { readUserSession } from "@/lib/supabase/read-session";
import createSupabaseServerClient from "@/lib/supabase/server";
import { EditForm } from "./edit-form";
import { Button } from "@/components/ui/button";
import { UserCog } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { redirect } from "next/navigation";

export async function EditProfile() {
  const {
    data: { session },
  } = await readUserSession();

  const supabase = await createSupabaseServerClient();

  if (!session) return redirect("/account");

  const { data: user, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session?.user?.id)
    .single();

  if (!user) return null;

  const { data: address } = await supabase
    .from("address")
    .select("*")
    .eq("id", user.address_id!)
    .single();

  if (!address) return null;

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="font-bold items-center gap-2"
            variant={"outline"}
            size={"lg"}
          >
            <UserCog size={16} />
            <span>Edit Profile</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="space-y-3 max-w-[500px] sm:max-w-[700px] overflow-auto">
          <SheetHeader>
            <SheetTitle>Editing Profile</SheetTitle>
            <SheetDescription>
              Currently editing {user.first_name} {user.last_name}
            </SheetDescription>
          </SheetHeader>
          <EditForm user={user} address={address} />
        </SheetContent>
      </Sheet>
    </>
  );
}
