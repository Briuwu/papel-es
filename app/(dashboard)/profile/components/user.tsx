import { User as UserIcon } from "lucide-react";
import { getUserProfile } from "@/app/(dashboard)/profile/actions";
export async function User() {
  const res = await getUserProfile();

  const { fullName, email } = JSON.parse(res);

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center">
      <div className="w-fit rounded-full border-2 border-black p-4">
        <UserIcon className="h-10 w-10 md:h-28 md:w-28" />
      </div>
      <div>
        <h1 className="text-xl font-bold md:text-3xl">{fullName}</h1>
        <p className="text-sm md:text-base">{email}</p>
      </div>
    </div>
  );
}
