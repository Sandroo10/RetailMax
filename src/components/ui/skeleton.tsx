import { cn } from "@/lib/utils";

export const Skeleton = ({ className }: { className?: string }) => (
  <div
    aria-hidden="true"
    className={cn(
      "animate-pulse rounded-md bg-gradient-to-r from-surface-2 via-surface-3 to-surface-2",
      className,
    )}
  />
);
