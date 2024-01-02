import { BarangayClearanceIcon } from "@/app/(dashboard)/request/images/BarangayClearanceIcon";
import { BarangayIDIcon } from "@/app/(dashboard)/request/images/BarangayIDIcon";
import { IncidentReportIcon } from "@/app/(dashboard)/request/images/IncidentReportIcon";

import { CardOptions } from "./components/card-options";
import { BarangayClearanceForm } from "./components/barangay-clearance-form";
import createSupabaseServerClient from "@/lib/supabase/server";
import { readUserSession } from "@/lib/supabase/read-session";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { FormSkeleton } from "./components/form-skeleton";

export default async function RequestPage({
  searchParams,
}: {
  searchParams: { opt?: string };
}) {
  const {
    data: { session },
  } = await readUserSession();

  if (!session) return redirect("/account");

  const supabase = await createSupabaseServerClient();

  if (!session) return redirect("/account");

  const { data: user, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session?.user?.id)
    .single();

  if (!user) return null;

  const { data: address } = await supabase
    .from("address")
    .select("*")
    .eq("id", user.address_id!)
    .single();

  if (!address) return null;

  const requests = [
    {
      id: 1,
      name: "Barangay Clearance",
      path: "barangay-clearance",
      icon: <BarangayClearanceIcon />,
      active: searchParams.opt === "barangay-clearance",
    },
    {
      id: 2,
      name: "Barangay ID",
      path: "barangay-id",
      icon: <BarangayIDIcon />,
      active: searchParams.opt === "barangay-id",
    },
    {
      id: 3,
      name: "Incident Report",
      path: "incident-report",
      icon: <IncidentReportIcon />,
      active: searchParams.opt === "incident-report",
    },
  ];

  const displayOptions = requests.filter((request) => request.active);

  return (
    <div className="space-y-10">
      <h1 className="text-lg font-bold md:text-3xl uppercase sm:text-xl">
        I am requesting for
        {displayOptions.length > 0 ? " " + displayOptions[0].name : "..."}
      </h1>
      <div className="grid md:grid-cols-3 gap-5 sm:grid-cols-2 grid-cols-1">
        <CardOptions requests={requests} />
      </div>

      {displayOptions.length > 0 &&
        displayOptions.map((request) => {
          switch (request.path) {
            case "barangay-clearance":
              return (
                <Suspense fallback={<FormSkeleton />}>
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
        })}
    </div>
  );
}
