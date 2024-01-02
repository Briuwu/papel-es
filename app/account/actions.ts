"use server";
import createSupabaseServerClient from "@/lib/supabase/server";
import * as z from "zod";
import { formSchema } from "./components/register-form";

type FormSchemaType = z.infer<typeof formSchema>;

type RegisterData = Omit<FormSchemaType, "confirmPassword">;

export async function handleRegister(data: RegisterData) {
  const supabase = await createSupabaseServerClient();

  const { data: result, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        middle_name: data.middleName || null,
        email: data.email,
      },
    },
  });

  if (error) {
    return JSON.stringify({ error: error.message });
  }

  return JSON.stringify(result);
}

type LoginData = Pick<FormSchemaType, "email" | "password">;

export async function handleLogin(data: LoginData) {
  const supabase = await createSupabaseServerClient();

  const { data: result, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return JSON.stringify({ error: error.message });
  }

  return JSON.stringify(result);
}
