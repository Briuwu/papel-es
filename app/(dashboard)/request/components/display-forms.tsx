import { Suspense } from "react";
import { BarangayClearanceForm } from "./barangay-clearance-form";
import { FormSkeleton } from "./form-skeleton";
import { readUserSession } from "@/lib/supabase/read-session";
import { redirect } from "next/navigation";
import createSupabaseServerClient from "@/lib/supabase/server";

type DisplayOptionsType = {
  id: number;
  name: string;
  path: string;
  icon: React.ReactNode;
  active: boolean;
}[];

export async function DisplayForm({
  displayOptions,
  opt,
}: {
  displayOptions: DisplayOptionsType;
  opt?: string | null;
}) {
  const {
    data: { session },
  } = await readUserSession();

  if (!session) return redirect("/account");

  const supabase = await createSupabaseServerClient();

  const { data: user, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session?.user?.id)
    .single();

  if (error) return redirect("/account");

  const { data: address } = await supabase
    .from("address")
    .select("*")
    .eq("id", user.address_id!)
    .single();

  if (!user || !address) return <p>Something went wrong...</p>;

  return (
    displayOptions.length > 0 &&
    displayOptions.map((request) => {
      switch (request.path) {
        case "barangay-clearance":
          return (
            <Suspense key={opt} fallback={<FormSkeleton />}>
              <BarangayClearanceForm
                user={user}
                address={address}
                key={request.path}
              />
            </Suspense>
          );
        case "barangay-id":
          return null;
        case "incident-report":
          return null;
        default:
          return null;
      }
    })
  );
}
