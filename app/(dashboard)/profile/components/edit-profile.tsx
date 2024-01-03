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
            className="items-center gap-2 font-bold"
            variant={"outline"}
            size={"lg"}
          >
            <UserCog size={16} />
            <span>Edit Profile</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="max-w-[500px] space-y-3 overflow-auto sm:max-w-[700px]">
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
