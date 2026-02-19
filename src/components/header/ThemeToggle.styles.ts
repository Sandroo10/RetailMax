import { cva } from "class-variance-authority";

export const button = cva(
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition hover:border-main hover:text-main",
);
