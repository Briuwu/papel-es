"use server";

import { readUserSession } from "@/lib/supabase/read-session";
import createSupabaseServerClient from "@/lib/supabase/server";

export async function handleClearanceForm() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { session },
  } = await readUserSession();
}
