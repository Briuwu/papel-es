import { BarangayClearanceForm } from "./barangay-clearance-form";
import { readUserSession } from "@/lib/supabase/read-session";
import { redirect } from "next/navigation";
import createSupabaseServerClient from "@/lib/supabase/server";
import { BarangayIdForm } from "./barangay-id-form";
import { IncidentReportForm } from "./incident-report-form";

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
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await readUserSession();

  if (!session) return redirect("/account");

  const [profileResult, addressResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("*")
      .eq("id", session?.user?.id)
      .single(),
    supabase
      .from("address")
      .select("*")
      .eq("profile_id", session?.user.id)
      .single(),
  ]);

  const profileError = profileResult.error;
  const addressError = addressResult.error;

  if (profileError || addressError) {
    throw new Error("Error fetching data");
  }

  const user = profileResult.data;
  const address = addressResult.data;

  return (
    displayOptions.length > 0 &&
    displayOptions.map((request) => {
      switch (request.path) {
        case "barangay-clearance":
          return (
            <BarangayClearanceForm
              key={request.id}
              user={user}
              address={address}
            />
          );
        case "barangay-id":
          return (
            <BarangayIdForm key={request.id} user={user} address={address} />
          );
        case "incident-report":
          return (
            <IncidentReportForm
              key={request.id}
              user={user}
              address={address}
            />
          );
        default:
          return null;
      }
    })
  );
}
