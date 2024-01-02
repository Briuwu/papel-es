import { BarangayClearanceForm } from "./barangay-clearance-form";
import { ProfileType, AddressType } from "@/types";

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
}: {
  displayOptions: DisplayOptionsType;
  user: ProfileType;
  address: AddressType;
}) {
  return (
    displayOptions.length > 0 &&
    displayOptions.map((request) => {
      switch (request.path) {
        case "barangay-clearance":
          return (
            <BarangayClearanceForm
              user={user}
              address={address}
              key={request.path}
            />
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
