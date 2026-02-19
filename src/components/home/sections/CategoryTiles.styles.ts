import { cva } from "class-variance-authority";

export const section = cva("grid gap-4 sm:grid-cols-2 lg:grid-cols-3");

export const tile = cva(
  "group relative overflow-hidden rounded-2xl border border-border bg-surface",
);

export const image = cva(
  "h-44 w-full object-cover transition duration-300 group-hover:scale-105",
);

export const body = cva("space-y-2 p-4");

export const title = cva("text-base font-bold text-foreground");

export const copy = cva("text-sm text-muted-foreground");

export const action = cva(
  "inline-flex text-sm font-semibold text-main underline-offset-4 hover:underline",
);
