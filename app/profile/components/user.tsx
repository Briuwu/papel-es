import { User as UserIcon } from "lucide-react";
import { getUserProfile } from "../actions";
export async function User() {
  const { data, email, fullName } = await getUserProfile();

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-5">
      <div className="w-fit border-2 border-black rounded-full p-4">
        <UserIcon className="md:w-28 md:h-28 w-10 h-10" />
      </div>
      <div>
        <h1 className="md:text-3xl font-bold text-xl">{fullName}</h1>
        <p className="text-sm md:text-base">{email}</p>
      </div>
    </div>
  );
}
