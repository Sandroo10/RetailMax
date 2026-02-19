import { cva } from "class-variance-authority";

export const row = cva(
  "grid items-center gap-3 rounded-2xl border border-border bg-background p-3 sm:grid-cols-[84px_1fr_auto]",
);

export const image = cva("h-20 w-20 rounded-lg object-cover");

export const content = cva("min-w-0");

export const name = cva("truncate text-sm font-semibold text-foreground");

export const description = cva("line-clamp-2 text-xs text-muted-foreground");

export const controls = cva("flex items-center gap-2");

export const controlButton = cva(
  "inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-sm font-bold hover:border-main",
);

export const quantity = cva("w-8 text-center text-sm font-semibold");

export const price = cva("min-w-20 text-right text-sm font-bold text-main");
