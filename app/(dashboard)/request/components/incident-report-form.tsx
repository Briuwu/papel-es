"use client";

import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useState, useTransition } from "react";
import { ProfileType, AddressType } from "@/types";
import Link from "next/link";
import { handleIDForm, handleIncidentReportForm } from "../action";

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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const formSchema = z.object({
  incident_type: z
    .string({
      required_error: "An incident type is required.",
    })
    .min(3, "Please enter a valid incident type."),
  incident_location: z
    .string({
      required_error: "An incident location is required.",
    })
    .min(3, "Please enter a valid incident location."),
  incident_narrative: z
    .string({
      required_error: "An incident narrative is required.",
    })
    .min(3, "Please enter a valid incident narrative."),
  involved_parties: z
    .string({
      required_error: "An involved party is required.",
    })
    .min(3, "Please enter a valid involved party."),
  incident_date: z.date({
    required_error: "An incident date is required.",
  }),
});

export function IncidentReportForm({
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
      incident_type: "",
      incident_location: "",
      incident_narrative: "",
      involved_parties: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const result = await handleIncidentReportForm(data);
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
        This ID is an official recognized government-issued, it is a proof that
        you live in this barangay. This ID is valid for 1 year.
      </p>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-10"
        id="form"
      >
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

        <div>
          <p className="font-bold">Incident Report Form</p>
          <p className="text-sm opacity-75">
            Involved Person / Specific Identification
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-7">
            <FormField
              control={form.control}
              name="incident_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Incident</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Car crash"
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
              name="incident_location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Exact Location of Incident (road, zone, barangay, etc)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Barangay 1, Zone 1, Road 1"
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
              name="incident_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Incident</FormLabel>
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
                        toYear={new Date().getFullYear()}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="involved_parties"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Full name of person/s involved (seperate by comma if more
                    than one)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe, Jane Doe"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="incident_narrative"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Incident Narrative</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Incident narrative"
                      {...field}
                      disabled={isPending}
                      className="h-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
            Submit Request
          </Button>
        </div>
      </form>
    </Form>
  );
}
