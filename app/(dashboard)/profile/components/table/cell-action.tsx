import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export function CellAction() {
  return (
    <Button className="h-8 w-8 p-0" variant={"ghost"}>
      <span className="sr-only">Open Menu</span>
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  );
}
