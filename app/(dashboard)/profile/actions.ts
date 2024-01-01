"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { transformMiddleInitial } from "@/lib/utils";

export async function handleLogout() {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

export async function getUserProfile() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session?.user.id || "")
    .single();

  if (error) {
    return JSON.stringify({ error: error.message });
  }

  if (!data) {
    return JSON.stringify({ error: "User not found" });
  }

  const fullName = `${data?.first_name} ${transformMiddleInitial(
    data?.middle_name
  )} ${data?.last_name}`;

  return JSON.stringify({
    ...data,
    email: session?.user.email,
    fullName,
  });
}
