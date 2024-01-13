"use client";

import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import validator from "validator";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Hover } from "@/components/hover";

import { ProfileType, AddressType } from "@/types";
import {
  ACCEPTED_IMAGE_TYPES,
  VALID_ID_TYPES,
} from "@/app/(dashboard)/request/data";
import { handleUpdateProfile } from "@/app/(dashboard)/profile/actions";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { uploadFile } from "@/app/(dashboard)/upload-file";

const formSchema = z.object({
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
  upload_proof: z
    .any()
    .refine((files) => files?.length == 1, "Please upload a valid file.")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      "Please upload a valid file. (Accepted file types: jpg, jpeg, png)",
    ),
});

export function EditForm({
  user,
  address,
}: {
  user: ProfileType;
  address: AddressType;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [userId, setUserId] = useState("");
  const supabase = createSupabaseBrowserClient();

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
    startTransition(async () => {
      const file = data.upload_proof[0];
      if (file) {
        await uploadFile(file, userId);
      }
      const { upload_proof, ...rest } = data;
      const result = await handleUpdateProfile(rest);

      const { error } = JSON.parse(result);

      if (error) {
        toast.error(error);
      } else {
        toast.success("Account successfully updated!");
        router.push("/account");
      }
    });
  }

  const fileRef = form.register("upload_proof", { required: true });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <p className="font-bold md:col-span-2">Personal Information</p>
          <FormField
            control={form.control}
            name="firstName"
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
            name="middleName"
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
            name="lastName"
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="09123456789"
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
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild disabled={isPending}>
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

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
                    disabled={isPending}
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
                    placeholder="Grand Riverside"
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
            name="barangay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Barangay</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Pasong Camachile 1"
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
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    placeholder="General Trias"
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
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Province</FormLabel>
                <FormControl>
                  <Input placeholder="Cavite" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:col-span-2">
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
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <Button
            type="submit"
            className="ml-auto block rounded font-bold"
            disabled={isPending}
          >
            Update Profile
          </Button>
        </div>
      </form>
    </Form>
  );
}
