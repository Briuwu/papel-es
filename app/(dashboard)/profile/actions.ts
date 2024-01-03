"use server";

import * as z from "zod";
import createSupabaseServerClient from "@/lib/supabase/server";
import { transformMiddleInitial } from "@/lib/utils";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { formSchema } from "@/app/(dashboard)/profile/components/edit-form";
type EditFormType = z.infer<typeof formSchema>;

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

  if (!session) {
    throw new Error("User not found");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session?.user.id)
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

export async function handleUpdateProfile(data: EditFormType) {
  noStore();
  const supabase = await createSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("User not found");
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      first_name: data.firstName,
      middle_name: data.middleName,
      last_name: data.lastName,
      phone_number: data.phone,
      date_of_birth: data.dob.toLocaleString(),
    })
    .eq("id", session?.user.id);

  if (profileError) {
    return JSON.stringify({ error: profileError.message });
  }

  const { error: addressError } = await supabase
    .from("address")
    .update({
      city: data.city,
      province: data.province,
      street: data.street,
      barangay: data.barangay,
      subdivision: data.subdivision,
    })
    .eq("profile_id", session?.user.id);

  if (addressError) {
    return JSON.stringify({ error: addressError.message });
  }

  revalidatePath("/profile");
  return JSON.stringify({ success: true });
}
