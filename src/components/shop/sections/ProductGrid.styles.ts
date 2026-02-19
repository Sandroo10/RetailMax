import { cva } from "class-variance-authority";

export const loading = cva(
  "rounded-xl border border-border bg-surface p-6 text-sm",
);

export const empty = cva(
  "rounded-xl border border-border bg-surface p-8 text-center text-sm",
);

export const grid = cva(
  "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
);

export const pagination = cva("mt-6");
