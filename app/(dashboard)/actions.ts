"use server";
import createSupabaseServerClient from "@/lib/supabase/server";
import { formSchema } from "@/app/(dashboard)/components/continuation-form";
import * as z from "zod";
import { Tables } from "@/lib/supabase/database.types";

type FormSchema = z.infer<typeof formSchema>;

type AddressType = Tables<"address">;

type ProfileType = Tables<"profiles">;

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
    .select()
    .single();

  if (addressError || !addressResult) {
    return JSON.stringify({ error: addressError?.message });
  }

  const address: AddressType = addressResult;

  const { data: user, error } = await supabase
    .from("profiles")
    .update({
      phone_number: data.phone,
      date_of_birth: data.dob.toLocaleString(),
      address_id: address.id,
      isVerified: true,
    })
    .eq("id", session.user.id)
    .select()
    .single();

  if (error) {
    return JSON.stringify({ error: error.message });
  }

  return JSON.stringify(user);
}
