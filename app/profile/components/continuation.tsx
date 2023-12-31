"use client";
import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ContinuationForm } from "./continuation-form";

export default function Continuation() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <div>
      <AlertDialog defaultOpen>
        <AlertDialogContent
          className={"overflow-y-auto max-h-screen md:max-w-screen-md"}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Complete your registration</AlertDialogTitle>
            <AlertDialogDescription>
              This is a continuation of your registration, to ensure a smooth
              and secure experience.
            </AlertDialogDescription>
            <ContinuationForm />
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
