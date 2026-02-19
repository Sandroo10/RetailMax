import { cva } from "class-variance-authority";

export const container = cva(
  "mx-auto w-full max-w-xl rounded-2xl border border-border bg-surface p-4",
);

export const tabs = cva("mb-4 grid grid-cols-2 gap-2");

export const tab = cva(
  "rounded-lg border border-border px-3 py-2 text-sm font-semibold text-foreground transition hover:border-main",
  {
    variants: {
      active: {
        true: "border-main bg-main text-main-foreground",
        false: "",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);
