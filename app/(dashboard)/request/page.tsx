import { BarangayClearanceIcon } from "@/app/(dashboard)/request/images/BarangayClearanceIcon";
import { BarangayIDIcon } from "@/app/(dashboard)/request/images/BarangayIDIcon";
import { IncidentReportIcon } from "@/app/(dashboard)/request/images/IncidentReportIcon";

import { CardOptions } from "./components/card-options";
import { DisplayForm } from "./components/display-forms";

export default async function RequestPage({
  searchParams,
}: {
  searchParams: { opt?: string };
}) {
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
      <h1 className="text-lg font-bold uppercase sm:text-xl md:text-3xl">
        I am requesting for
        {displayOptions.length > 0 ? " " + displayOptions[0].name : "..."}
      </h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        <CardOptions requests={requests} />
      </div>

      <DisplayForm displayOptions={displayOptions} opt={searchParams.opt} />
    </div>
  );
}
