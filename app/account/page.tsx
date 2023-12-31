import { readUserSession } from "@/lib/supabase/read-session";
import { CreationTabs } from "@/app/account/components/creation-tab";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const { data } = await readUserSession();

  if (data.session) {
    return redirect("/profile");
  }

  return (
    <main className="bg-blue-500 p-5 grid min-h-screen">
      <div className="bg-white md:w-[680px] rounded-xl w-full mx-auto p-10 flex flex-col gap-10">
        <div className="space-y-2 text-center">
          <h1 className="md:text-5xl sm:text-4xl text-2xl font-bold text-blue-500">
            PAPEL-ES
          </h1>
          <p className="md:text-5xl sm:text-4xl text-2xl font-semibold">
            Welcome Back!
          </p>
        </div>
        <CreationTabs />
      </div>
    </main>
  );
}
