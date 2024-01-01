import { BarangayClearanceIcon } from "@/app/(dashboard)/request/images/BarangayClearanceIcon";
import { BarangayIDIcon } from "@/app/(dashboard)/request/images/BarangayIDIcon";
import { IncidentReportIcon } from "@/app/(dashboard)/request/images/IncidentReportIcon";

import { CardOptions } from "./components/CardOptions";

export default function RequestPage({
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

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-5 sm:grid-cols-2 grid-cols-1">
        <CardOptions requests={requests} />
      </div>
    </div>
  );
}
