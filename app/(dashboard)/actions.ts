"use server";
import createSupabaseServerClient from "@/lib/supabase/server";
import * as z from "zod";
import { Tables } from "@/lib/supabase/database.types";
import validator from "validator";

export const formSchema = z.object({
  phone: z
    .string({
      required_error: "A phone number is required.",
    })
    .refine((value) => validator.isMobilePhone(value), {
      message: "Please enter a valid phone number",
    }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  street: z.string({
    required_error: "A street is required.",
  }),
  city: z
    .string({
      required_error: "A city is required.",
    })
    .min(3, "City must be at least 3 characters."),
  subdivision: z
    .string({
      required_error: "A subdivision is required.",
    })
    .min(3, "Subdivision must be at least 3 characters."),
  province: z
    .string({
      required_error: "A province is required.",
    })
    .min(3, "Province must be at least 3 characters."),
  barangay: z
    .string({
      required_error: "A barangay is required.",
    })
    .min(3, "Barangay must be at least 3 characters."),
});

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
