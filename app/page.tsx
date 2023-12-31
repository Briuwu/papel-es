import { readUserSession } from "@/lib/supabase/read-session";
import { redirect } from "next/navigation";

export default async function Home() {
  const { data } = await readUserSession();

  if (!data.session || data.session) {
    return redirect("/account");
  }
}
