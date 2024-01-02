import { Suspense } from "react";
import { BarangayClearanceForm } from "./barangay-clearance-form";
import { ProfileType, AddressType } from "@/types";
import { FormSkeleton } from "./form-skeleton";

type DisplayOptionsType = {
  id: number;
  name: string;
  path: string;
  icon: React.ReactNode;
  active: boolean;
}[];

export function DisplayForm({
  displayOptions,
  user,
  address,
  opt,
}: {
  displayOptions: DisplayOptionsType;
  user: ProfileType;
  address: AddressType;
  opt?: string | null;
}) {
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
