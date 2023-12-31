import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const transformMiddleInitial = (middleName: string | null) => {
  if (!middleName) return null;
  return `${middleName[0]}.`;
};
