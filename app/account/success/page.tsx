import { Button } from "@/components/ui/button";
import { readUserSession } from "@/lib/supabase/read-session";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
export default async function SuccessPage() {
  const {
    data: { session },
  } = await readUserSession();

  if (session) {
    return (
      <main className="min-h-screen flex items-center justify-center flex-col text-center space-y-5">
        <ShieldCheck className="w-32 h-32 text-green-500" />
        <h1 className="md:text-3xl font-bold">
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
