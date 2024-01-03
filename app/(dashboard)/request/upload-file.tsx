"use client";

import createSupabaseBrowserClient from "@/lib/supabase/client";

const supabase = createSupabaseBrowserClient();
export async function uploadFile(file: File, userId: string) {
  const filePath = `${userId}/${file.name}`;
  const { error } = await supabase.storage
    .from("proofs")
    .upload(filePath, file);

  if (error) {
    throw new Error("Error uploading file");
  }
}
