"use server";

import * as z from "zod";
import { ACCEPTED_IMAGE_TYPES, purposes } from "@/app/(dashboard)/request/data";
import validator from "validator";
export const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  middleName: z.string().optional(),
  phone: z
    .string({
      required_error: "A phone number is required.",
    })
    .refine((value) => validator.isMobilePhone(value), {
      message: "Please enter a valid phone number",
    }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  street: z.string({
    required_error: "A street is required.",
  }),
  city: z
    .string({
      required_error: "A city is required.",
    })
    .min(3, "City must be at least 3 characters."),
  subdivision: z.string({
    required_error: "A subdivision is required.",
  }),
  province: z
    .string({
      required_error: "A province is required.",
    })
    .min(3, "Province must be at least 3 characters."),
  barangay: z
    .string({
      required_error: "A barangay is required.",
    })
    .min(3, "Barangay must be at least 3 characters."),
  purpose: z
    .string({
      required_error: "A purpose is required.",
    })
    .refine((value) => {
      return purposes.some((purpose) => purpose.value === value);
    }),
  upload_proof: z
    .any()
    .refine((files) => files?.length == 1, "Please upload a valid file.")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      "Please upload a valid file. (Accepted file types: jpg, jpeg, png)"
    ),
});
