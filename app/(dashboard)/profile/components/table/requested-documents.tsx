import createSupabaseServerClient from "@/lib/supabase/server";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";

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
    <div className="my-10 space-y-3">
      <div className="flex flex-col-reverse items-start justify-between gap-2 md:flex-row md:items-center">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <h2 className="font-bold md:text-2xl">Requested Documents</h2>
        </div>

        <Button asChild variant={"outline"}>
          <Link href={"/request"}>
            <FilePlus className="mr-2" size={18} />
            Request a document
          </Link>
        </Button>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
