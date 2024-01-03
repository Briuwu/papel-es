"use server";

import { readUserSession } from "@/lib/supabase/read-session";
import createSupabaseServerClient from "@/lib/supabase/server";
import { formSchema } from "./components/barangay-clearance-form";
import * as z from "zod";

type FormSchema = z.infer<typeof formSchema>;

export async function handleClearanceForm(data: FormSchema) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { session },
  } = await readUserSession();
}
