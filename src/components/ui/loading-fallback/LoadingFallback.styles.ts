import { cva } from "class-variance-authority";

export const container = cva(
  "flex min-h-[40vh] items-center justify-center rounded-3xl border border-border bg-surface",
);

export const message = cva("text-lg font-semibold text-main");
