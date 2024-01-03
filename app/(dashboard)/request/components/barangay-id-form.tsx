"use client";

import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import validator from "validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useEffect, useState, useTransition } from "react";
import {
  ACCEPTED_IMAGE_TYPES,
  VALID_ID_TYPES,
} from "@/app/(dashboard)/request/data";
import { ProfileType, AddressType } from "@/types";
import Link from "next/link";
import { handleIDForm } from "../action";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { uploadFile } from "../upload-file";

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
import { Hover } from "@/components/hover";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  upload_proof: z
    .any()
    .refine((files) => files?.length == 1, "Please upload a valid file.")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      "Please upload a valid file. (Accepted file types: jpg, jpeg, png)",
    ),
  first_name: z
    .string({
      required_error: "First name is required.",
    })
    .min(2, "First name must be at least 2 characters."),
  middle_name: z.string().optional(),
  last_name: z
    .string({
      required_error: "Last name is required.",
    })
    .min(2, "Last name must be at least 2 characters."),
  phone_number: z
    .string({
      required_error: "Phone number is required.",
    })
    .refine((value) => {
      return validator.isMobilePhone(value);
    }, "Please enter a valid phone number."),
  street: z
    .string({
      required_error: "Street is required.",
    })
    .min(2, "Street must be at least 2 characters."),
  barangay: z
    .string({
      required_error: "Barangay is required.",
    })
    .min(2, "Barangay must be at least 2 characters."),
  province: z
    .string({
      required_error: "Province is required.",
    })
    .min(2, "Province must be at least 2 characters."),
  subdivision: z
    .string({
      required_error: "Subdivision is required.",
    })
    .min(2, "Subdivision must be at least 2 characters."),
  city: z
    .string({
      required_error: "City is required.",
    })
    .min(2, "City must be at least 2 characters."),
  isSameAddress: z.boolean(),
});

export function BarangayIdForm({
  user,
  address,
}: {
  user: ProfileType;
  address: AddressType;
}) {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [userId, setUserId] = useState("");
  const [isSameAddress, setIsSameAddress] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      street: isSameAddress ? address.street! : "",
      barangay: isSameAddress ? address.barangay! : "",
      province: isSameAddress ? address.province! : "",
      subdivision: isSameAddress ? address.subdivision! : "",
      city: isSameAddress ? address.city! : "",
      first_name: "",
      middle_name: "",
      last_name: "",
      phone_number: "",
      isSameAddress,
    },
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          setUserId(user.id);
        } else {
          setUserId("");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [supabase.auth]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.error("This feature is not yet available.");
    console.log(data);
    // startTransition(async () => {
    //   const file = data.upload_proof[0];
    //   if (file) {
    //     await uploadFile(file, userId);
    //   }
    //   const result = await handleIDForm();

    //   const { error } = JSON.parse(result);

    //   if (error) {
    //     toast.error(error);
    //   } else {
    //     toast.success("Request submitted successfully.");
    //     router.push(`/profile`);
    //   }
    // });
  }

  const fileRef = form.register("upload_proof", { required: true });

  return (
    <Form {...form}>
      <p>
        This ID is an official recognized government-issued, it is a proof that
        you live in this barangay. This ID is valid for 1 year.
      </p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-10">
        <p className="text-lg font-bold uppercase sm:text-xl md:text-2xl">
          Please fill up the following form:
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-5">
            <p className="font-bold">Personal Information:</p>
            <div className="space-y-1">
              <Label>First Name</Label>
              <Input
                defaultValue={user.first_name || ""}
                disabled
                className="disabled:font-semibold"
              />
            </div>
            <div className="space-y-1">
              <Label>Middle Name</Label>
              <Input
                defaultValue={user.middle_name || ""}
                disabled
                className="disabled:font-semibold"
              />
            </div>
            <div className="space-y-1">
              <Label>Last Name</Label>
              <Input
                defaultValue={user.last_name || ""}
                disabled
                className="disabled:font-semibold"
              />
            </div>
            <div className="space-y-1">
              <Label>Phone Number</Label>
              <Input
                defaultValue={user.phone_number || ""}
                disabled
                className="disabled:font-semibold"
              />
            </div>
            <div className="space-y-1">
              <Label>Birthdate</Label>
              <Input
                type="date"
                defaultValue={format(
                  new Date(user.date_of_birth || ""),
                  "yyyy-MM-dd",
                )}
                disabled
                className="disabled:font-semibold"
              />
            </div>
          </div>
          <div className="space-y-5">
            <p className="font-bold">Address Information:</p>
            <div className="space-y-1">
              <Label>Street</Label>
              <Input
                defaultValue={address.street || ""}
                disabled
                className="disabled:font-semibold"
              />
            </div>
            <div className="space-y-1">
              <Label>Barangay</Label>
              <Input
                defaultValue={address.barangay || ""}
                disabled
                className="disabled:font-semibold"
              />
            </div>
            <div className="space-y-1">
              <Label>Province</Label>
              <Input
                defaultValue={address.province || ""}
                disabled
                className="disabled:font-semibold"
              />
            </div>
            <div className="space-y-1">
              <Label>Subdivision</Label>
              <Input
                defaultValue={address.subdivision || ""}
                disabled
                className="disabled:font-semibold"
              />
            </div>
            <div className="space-y-1">
              <Label>City</Label>
              <Input
                defaultValue={address.city || ""}
                disabled
                className="disabled:font-semibold"
              />
            </div>
          </div>
        </div>

        <p className="text-sm italic text-orange-700">
          <span className="font-semibold">Note:</span> In order to change your
          personal & address information, please go to{" "}
          <Link href={"/profile"} className="font-bold text-black underline">
            Profile
          </Link>
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          <p className="col-span-2 font-bold">
            In case of emergency contact information:
          </p>
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middle_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Middle Name"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Last Name"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Phone Number"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Street"
                      {...field}
                      disabled={isSameAddress || isPending}
                      className="disabled:font-semibold"
                    />
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
                    <Input
                      placeholder="Barangay"
                      {...field}
                      disabled={isSameAddress || isPending}
                      className="disabled:font-semibold"
                    />
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
                    <Input
                      placeholder="Province"
                      {...field}
                      disabled={isSameAddress || isPending}
                      className="disabled:font-semibold"
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
                    <Input
                      placeholder="Subdivision"
                      {...field}
                      disabled={isSameAddress || isPending}
                      className="disabled:font-semibold"
                    />
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
                    <Input
                      placeholder="City"
                      {...field}
                      disabled={isSameAddress || isPending}
                      className="disabled:font-semibold"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isSameAddress"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(value) => {
                        setIsSameAddress(!isSameAddress);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Same as my current address (Please double check your
                      address information)
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
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
                    className="touch-none text-sm"
                    type="button"
                  >
                    valid IDs
                  </Button>
                }
              >
                <ul className="list-disc space-y-1 px-3">
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

        <div className="mt-5 space-y-4">
          {Object.keys(form.formState.errors).length > 0 && (
            <p className="text-sm text-red-500">
              Please fix the errors above before submitting the form.
            </p>
          )}
          <Button
            type="submit"
            className="mr-auto block rounded font-bold"
            disabled={isPending}
          >
            Review Request
          </Button>
        </div>
      </form>
    </Form>
  );
}
