"use server";
import createSupabaseServerClient from "@/lib/supabase/server";
import { LoginDataType, RegisterDataType } from "@/types";

export async function handleRegister(data: RegisterDataType) {
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

export async function handleLogin(data: LoginDataType) {
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
