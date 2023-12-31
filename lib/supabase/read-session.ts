"use server";
import createSupabaseServerClient from "./server";

export async function readUserSession() {
  const supabase = await createSupabaseServerClient();

  return supabase.auth.getSession();
}
