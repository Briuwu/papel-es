"use server";

import { readUserSession } from "@/lib/supabase/read-session";
import createSupabaseServerClient from "@/lib/supabase/server";
import * as z from "zod";

export async function handleClearanceForm(data: { purpose: string }) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { session },
  } = await readUserSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const { data: document, error: documentError } = await supabase
    .from("documents")
    .insert({
      profile_id: session.user.id,
      document_type: "barangay_clearance",
    })
    .select()
    .single();

  if (documentError) return JSON.stringify({ error: documentError.message });

  const { error: documentClearanceError } = await supabase
    .from("barangay_clearance_request")
    .insert({
      document_id: document.id,
      profile_id: session.user.id,
      purpose: data.purpose,
    })
    .select()
    .single();

  if (documentClearanceError)
    return JSON.stringify({ error: documentClearanceError.message });

  return JSON.stringify({ success: true });
}
