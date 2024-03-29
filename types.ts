import { Tables } from "./lib/supabase/database.types";

export type AddressType = Tables<"address">;
export type ProfileType = Tables<"profiles">;

export type Documents = {
  id: string;
  status: "processing" | "rejected" | "ready";
  type: "barangay_id" | "barangay_clearance" | "incident_report";
  date: string;
};

export type EditFormType = {
  firstName: string;
  lastName: string;
  middleName?: string;
  phone: string;
  dob: Date;
  street: string;
  city: string;
  subdivision: string;
  province: string;
  barangay: string;
};

export type ContinuationFormType = {
  phone: string;
  dob: Date;
  street: string;
  city: string;
  subdivision: string;
  province: string;
  barangay: string;
};

export type BarangayIdFormType = {
  first_name: string;
  last_name: string;
  phone_number: string;
  street: string;
  barangay: string;
  province: string;
  subdivision: string;
  city: string;
  isSameAddress: boolean;
  middle_name?: string | undefined;
};

export type IncidentReportFormType = {
  incident_type: string;
  incident_location: string;
  incident_narrative: string;
  involved_parties: string;
  incident_date: Date;
};

export type RegisterDataType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName?: string;
};

export type LoginDataType = {
  email: string;
  password: string;
};
