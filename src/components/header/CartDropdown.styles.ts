import { cva } from "class-variance-authority";

export const container = cva(
  "absolute right-0 top-[4.5rem] z-50 flex w-[19rem] flex-col rounded-2xl border border-border bg-background p-4 shadow-lg",
);

export const list = cva("flex max-h-64 flex-col gap-3 overflow-y-auto pr-1");

export const empty = cva("py-8 text-center text-sm text-muted-foreground");

export const row = cva("flex items-center gap-3 rounded-xl bg-surface p-2");

export const image = cva("h-14 w-14 rounded-lg object-cover");

export const content = cva("flex min-w-0 flex-col text-sm");

export const name = cva("truncate font-semibold text-foreground");

export const price = cva("text-main");

export const actions = cva("mt-4 flex items-center justify-between");

export const total = cva("text-sm font-semibold text-foreground");

export const checkoutButton = cva(
  "rounded-lg bg-main px-3 py-2 text-sm font-semibold text-main-foreground transition hover:opacity-90",
);
