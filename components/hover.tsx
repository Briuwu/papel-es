import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export function Hover({
  trigger,
  children,
}: {
  trigger: JSX.Element;
  children: React.ReactNode;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{trigger}</HoverCardTrigger>
      <HoverCardContent side="top">{children}</HoverCardContent>
    </HoverCard>
  );
}
