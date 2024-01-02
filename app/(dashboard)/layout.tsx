import { Navbar } from "@/app/(dashboard)/components/navbar";
import { readUserSession } from "@/lib/supabase/read-session";
import createSupabaseServerClient from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Continuation from "@/app/(dashboard)/components/continuation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: { session },
  } = await readUserSession();

  if (!session) return redirect("/account");

  const supabase = await createSupabaseServerClient();

  const { data: user } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session?.user?.id)
    .single();

  if (!user) return null;

  if (!user.isVerified) return <Continuation />;

  return (
    <>
      <Navbar />
      <main className="container my-16">{children}</main>
    </>
  );
}
