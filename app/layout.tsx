import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const poppins = Poppins({ weight: ["400", "600", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PAPEL-ES",
  description: "PAPEL-ES",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.className} antialiased`}>
        {children}
        <Toaster richColors theme="light" />
      </body>
    </html>
  );
}
