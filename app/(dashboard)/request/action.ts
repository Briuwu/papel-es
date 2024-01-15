"use server";

import { readUserSession } from "@/lib/supabase/read-session";
import createSupabaseServerClient from "@/lib/supabase/server";
import { BarangayIdFormType } from "@/types";

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

export async function handleIDForm(data: BarangayIdFormType) {
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
      document_type: "barangay_id",
    })
    .select()
    .single();

  if (documentError) return JSON.stringify({ error: documentError.message });

  const { data: emergency, error: emergencyError } = await supabase
    .from("emergency_contact")
    .insert({
      first_name: data.first_name,
      last_name: data.last_name,
      middle_name: data.middle_name,
      phone_number: data.phone_number,
      street: data.street,
      subdivision: data.subdivision,
      province: data.province,
      barangay: data.barangay,
      city: data.city,
      profile_id: session.user.id,
    })
    .select()
    .single();

  if (emergencyError) return JSON.stringify({ error: emergencyError.message });

  const { error: documentIdError } = await supabase
    .from("barangay_id_request")
    .insert({
      document_id: document.id,
      profile_id: session.user.id,
      emergency_id: emergency.id,
    })
    .select()
    .single();

  if (documentIdError)
    return JSON.stringify({ error: documentIdError.message });

  return JSON.stringify({ success: true });
}
