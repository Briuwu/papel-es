import createSupabaseServerClient from "@/lib/supabase/server";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export async function RequestedDocuments() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { data: documents, error: documentsError } = await supabase
    .from("documents")
    .select("*")
    .eq("profile_id", user.id)
    .order("created_at", { ascending: false });

  if (documentsError) {
    throw documentsError;
  }

  const data = documents?.map((document) => ({
    id: document.id,
    status: document.status,
    type: document.document_type,
    date: document.created_at,
  }));

  return (
    <div className="my-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
