import { Button } from "@/components/ui/button";
import { readUserSession } from "@/lib/supabase/read-session";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
export default async function SuccessPage() {
  const {
    data: { session },
  } = await readUserSession();

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center space-y-5 text-center">
        <ShieldCheck className="h-32 w-32 text-green-500" />
        <h1 className="font-bold md:text-3xl">
          Your account has been created! <br /> Please check your email to
          verify your account.
        </h1>
        <Button asChild>
          <Link href="/profile">Continue.</Link>
        </Button>
      </main>
    );
  }

  return redirect("/account");
}
