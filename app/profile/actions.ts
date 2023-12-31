"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { transformMiddleInitial } from "@/lib/utils";
import { formSchema } from "@/app/profile/components/continuation-form";
import * as z from "zod";
import { Tables } from "@/lib/supabase/database.types";

type FormSchema = z.infer<typeof formSchema>;

type AddressType = Tables<"address">;

type ProfileType = Tables<"profiles">;

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
    return null;
  }

  const fullName = `${data?.first_name} ${transformMiddleInitial(
    data?.middle_name
  )} ${data?.last_name}`;

  return {
    data,
    email: session?.user.email,
    fullName,
  };
}

export async function handleContinuationForm(data: FormSchema) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user.id) {
    throw new Error("User not found");
  }

  const { data: addressResult, error: addressError } = await supabase
    .from("address")
    .insert({
      profile_id: session?.user.id,
      street: data.street,
      subdivision: data.subdivision,
    })
    .select();

  if (addressError || !addressResult) {
    return JSON.stringify({ error: addressError?.message });
  }

  const address: AddressType = addressResult[0];

  const { data: user, error } = await supabase
    .from("profiles")
    .update({
      phone_number: data.phone,
      date_of_birth: data.dob.toLocaleDateString(),
      address_id: address.id,
      isVerified: true,
    })
    .eq("id", session.user.id)
    .select();

  if (error) {
    return JSON.stringify({ error: error.message });
  }

  return JSON.stringify(user);
}
