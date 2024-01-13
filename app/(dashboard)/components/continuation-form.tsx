"use client";

import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import validator from "validator";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { handleContinuationForm } from "@/app/(dashboard)/actions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState, useTransition } from "react";
import {
  ACCEPTED_IMAGE_TYPES,
  VALID_ID_TYPES,
} from "@/app/(dashboard)/request/data";
import { Hover } from "@/components/hover";
import { uploadFile } from "../upload-file";
import createSupabaseBrowserClient from "@/lib/supabase/client";

const formSchema = z.object({
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
  subdivision: z
    .string({
      required_error: "A subdivision is required.",
    })
    .min(3, "Subdivision must be at least 3 characters."),
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

export function ContinuationForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [userId, setUserId] = useState("");
  const supabase = createSupabaseBrowserClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      barangay: "Pasong Camachile 1",
      city: "General Trias",
      province: "Cavite",
      phone: "",
      street: "",
      subdivision: "",
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
      const result = await handleContinuationForm(rest);

      const { error } = JSON.parse(result);

      if (error) {
        toast.error(error);
      } else {
        toast.success("Your account has been updated.");
        router.refresh();
      }
    });
  }

  const fileRef = form.register("upload_proof", { required: true });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-3 text-left"
      >
        <p className="font-bold md:text-xl">Personal Information</p>
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
        <p className="font-bold md:text-xl">Address Information</p>
        <div className="grid gap-2 md:grid-cols-2">
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
            className="block rounded-full font-bold"
            disabled={isPending}
          >
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
}
