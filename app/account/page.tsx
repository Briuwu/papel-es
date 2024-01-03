import { readUserSession } from "@/lib/supabase/read-session";
import { CreationTabs } from "@/app/account/components/creation-tab";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const { data } = await readUserSession();

  if (data.session) {
    return redirect("/profile");
  }

  return (
    <main className="grid min-h-screen bg-blue-500 p-5">
      <div className="mx-auto flex w-full flex-col gap-10 rounded-xl bg-white p-10 md:w-[680px]">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-blue-500 sm:text-4xl md:text-5xl">
            PAPEL-ES
          </h1>
          <p className="text-2xl font-semibold sm:text-4xl md:text-5xl">
            Welcome Back!
          </p>
        </div>
        <CreationTabs />
      </div>
    </main>
  );
}
