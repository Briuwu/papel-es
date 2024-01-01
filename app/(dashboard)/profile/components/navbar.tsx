"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./logout-button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    {
      name: "Profile",
      path: "/profile",
      active: "/profile" === pathname,
    },
    {
      name: "Request Document",
      path: "/request",
      active: "/request" === pathname,
    },
  ];
  return (
    <nav className="p-4 shadow">
      <div className="flex justify-between items-center container">
        <h1>Logo</h1>
        <div className="block md:hidden">
          <MobileNavbar navLinks={navLinks} />
        </div>
        <ul className="space-x-5 hidden md:block">
          {navLinks.map(({ name, path, active }) => (
            <li key={name} className="inline-block">
              <Link
                href={path}
                className={cn(
                  "font-semibold hover:text-blue-400",
                  active && "font-bold text-blue-500"
                )}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
        <LogoutButton />
      </div>
    </nav>
  );
}

type NavLinksType = {
  name: string;
  path: string;
  active: boolean;
}[];

const MobileNavbar = ({ navLinks }: { navLinks: NavLinksType }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="space-y-5">
        <SheetHeader className="text-left">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Navigation links</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2">
          {navLinks.map(({ name, path, active }) => (
            <Link
              href={path}
              key={name}
              className={cn(
                "p-2 rounded-md hover:bg-gray-100",
                active && "bg-gray-100"
              )}
            >
              {name}
            </Link>
          ))}
          <LogoutButton className="block md:hidden" />
        </div>
      </SheetContent>
    </Sheet>
  );
};
