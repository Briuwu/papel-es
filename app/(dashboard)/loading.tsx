import { LoaderIcon } from "lucide-react";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-2">
      <div className="flex flex-col items-center justify-center">
        <div className="flex space-x-2 justify-center items-center bg-white dark:invert">
          <span className="sr-only">Loading...</span>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
