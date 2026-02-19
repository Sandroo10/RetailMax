import { cva } from "class-variance-authority";

export const trigger = cva(
  "inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-border bg-background px-3 text-sm font-semibold text-foreground transition hover:border-main hover:text-main",
);
