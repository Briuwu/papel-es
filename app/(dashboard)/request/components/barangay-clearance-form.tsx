"use client";

import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import validator from "validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useTransition } from "react";
import {
  ACCEPTED_IMAGE_TYPES,
  VALID_ID_TYPES,
  purposes,
} from "@/app/(dashboard)/request/data";
import { ProfileType, AddressType } from "@/types";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Hover } from "@/components/hover";
import Link from "next/link";
import { handleClearanceForm } from "../action";

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

export function BarangayClearanceForm({
  user,
  address,
}: {
  user: ProfileType;
  address: AddressType;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user.first_name || "",
      middleName: user.middle_name || "",
      lastName: user.last_name || "",
      phone: user.phone_number || "",
      dob: new Date(user.date_of_birth || ""),
      street: address.street || "",
      subdivision: address.subdivision || "",
      barangay: address.barangay || "",
      city: address.city || "",
      province: address.province || "",
    },
  });

  const fileRef = form.register("upload_proof", { required: true });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.error("This feature is not yet available.");
    console.log(data);
    // startTransition(async () => {
    //   const result = await handleUpdateProfile(data);

    //   const { error } = JSON.parse(result);

    //   if (error) {
    //     toast.error(error);
    //   } else {
    //     toast.success("Account successfully updated!");
    //     router.push("/account");
    //   }
    // });
  }

  return (
    <Form {...form}>
      <p>
        This document proves that you are of good moral character and a resident
        of the barangay.
      </p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
        <p className="text-lg sm:text-xl font-bold md:text-2xl uppercase">
          Please fill up the following form:
        </p>
        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem className="md:w-1/3">
              <FormLabel className="font-semibold">
                Purpose of requesting
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a valid purpose" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {purposes.map((purpose) => {
                    return (
                      <SelectItem key={purpose.value} value={purpose.value}>
                        {purpose.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
          <p className="font-bold md:col-span-2">Personal Information</p>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle Name (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Middle Name" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="09123456789" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild disabled>
                    <FormControl>
                      <Button variant={"outline"}>
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      fromYear={1950}
                      toYear={new Date().getFullYear() - 18}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
          <p className="font-bold md:col-span-2">Address Information</p>
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Blk 99 Lot 99 Phase 0A Alley 99"
                    {...field}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subdivision"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subdivision</FormLabel>
                <FormControl>
                  <Input placeholder="Grand Riverside" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="barangay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Barangay</FormLabel>
                <FormControl>
                  <Input placeholder="Pasong Camachile 1" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="General Trias" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Province</FormLabel>
                <FormControl>
                  <Input placeholder="Cavite" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="col-span-2 text-sm italic text-orange-700">
            <span className="font-semibold">Note:</span> In order to change the
            data above, please go to your{" "}
            <Link href={"/profile"} className="underline font-bold text-black">
              Profile
            </Link>
          </p>
        </div>

        <FormField
          control={form.control}
          name="upload_proof"
          render={({ field }) => (
            <FormItem className="md:w-1/3">
              <FormLabel>Please upload a proof of identification</FormLabel>
              <Hover
                trigger={
                  <Button
                    variant={"link"}
                    className="text-sm touch-none"
                    type="button"
                  >
                    valid IDs
                  </Button>
                }
              >
                <ul className="list-disc px-3 space-y-1">
                  {VALID_ID_TYPES.map((id) => (
                    <li key={id}>{id}</li>
                  ))}
                </ul>
              </Hover>
              <FormControl>
                <Input
                  type="file"
                  {...fileRef}
                  accept="image/png, image/jpeg, image/jpg"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4 mt-5">
          <Button
            type="submit"
            className="block font-bold rounded mr-auto"
            disabled={isPending}
          >
            Review Request
          </Button>
        </div>
      </form>
    </Form>
  );
}
