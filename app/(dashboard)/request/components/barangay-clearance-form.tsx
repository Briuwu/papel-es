"use client";

import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useEffect, useState, useTransition } from "react";
import {
  ACCEPTED_IMAGE_TYPES,
  VALID_ID_TYPES,
  purposes,
} from "@/app/(dashboard)/request/data";
import { ProfileType, AddressType } from "@/types";
import Link from "next/link";
import { handleClearanceForm } from "../action";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { uploadFile } from "../upload-file";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Hover } from "@/components/hover";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  purpose: z
    .string({
      required_error: "A purpose is required.",
    })
    .refine((value) => {
      return purposes.some((purpose) => purpose.value === value);
    }),
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
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const result = await handleClearanceForm({ purpose: data.purpose });

      const { error } = JSON.parse(result);

      if (error) {
        toast.error(error);
      } else {
        toast.success("Request submitted successfully.");
        router.push(`/profile`);
      }
    });
  }

  return (
    <Form {...form}>
      <p>
        This document proves that you are of good moral character and a resident
        of the barangay.
      </p>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-5"
        id="form"
      >
        <p className="text-lg font-bold uppercase sm:text-xl md:text-2xl">
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
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <p className="font-bold md:col-span-2">Personal Information</p>
          <div className="space-y-1">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              defaultValue={user.first_name || ""}
              disabled
              className="disabled:font-semibold"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="middle_name">Middle Name</Label>
            <Input
              id="middle_name"
              defaultValue={user.middle_name || ""}
              disabled
              className="disabled:font-semibold"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              defaultValue={user.last_name || ""}
              disabled
              className="disabled:font-semibold"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input
              id="phone_number"
              defaultValue={user.phone_number || ""}
              disabled
              className="disabled:font-semibold"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="date_of_birth">Birthdate</Label>
            <Input
              id="date_of_birth"
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

        <div className="grid gap-5">
          <p className="font-bold md:col-span-2">Address Information</p>
          <div className="space-y-1">
            <Label htmlFor="street">Street</Label>
            <Input
              id="street"
              defaultValue={address.street || ""}
              disabled
              className="disabled:font-semibold"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="barangay">Barangay</Label>
            <Input
              id="barangay"
              defaultValue={address.barangay || ""}
              disabled
              className="disabled:font-semibold"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              defaultValue={address.city || ""}
              disabled
              className="disabled:font-semibold"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="province">Province</Label>
            <Input
              id="province"
              defaultValue={address.province || ""}
              disabled
              className="disabled:font-semibold"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="subdivision">Subdivision</Label>
            <Input
              id="subdivision"
              defaultValue={address.subdivision || ""}
              disabled
              className="disabled:font-semibold"
            />
          </div>
          <p className="text-sm italic text-orange-700 md:col-span-2">
            <span className="font-semibold">Note:</span> In order to change your
            personal & address information, please go to{" "}
            <Link href={"/profile"} className="font-bold text-black underline">
              Profile
            </Link>
          </p>
        </div>

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
