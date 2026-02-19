import { cva } from "class-variance-authority";

export const container = cva("flex flex-wrap items-center gap-2");

export const link = cva(
  "rounded-full border border-border bg-background px-3 py-1.5 text-sm font-semibold text-foreground transition hover:border-main hover:text-main",
  {
    variants: {
      active: {
        true: "border-main bg-main text-main-foreground hover:text-main-foreground",
        false: "",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);
