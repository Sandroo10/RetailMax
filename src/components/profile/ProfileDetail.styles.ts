import { cva } from "class-variance-authority";

export const card = cva("mx-auto max-w-xl rounded-2xl border border-border bg-surface p-4");

export const empty = cva("rounded-xl border border-border bg-surface p-5 text-sm");

export const avatarWrap = cva("mb-4 flex items-center gap-3");

export const avatar = cva("h-16 w-16 rounded-full border border-border object-cover");

export const form = cva("grid gap-3");

export const fieldGroup = cva("grid gap-1.5");

export const label = cva("text-sm font-semibold text-foreground");

export const input = cva(
  "h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main/40",
);

export const button = cva(
  "w-fit rounded-lg bg-main px-4 py-2 text-sm font-semibold text-main-foreground transition hover:opacity-90",
);

export const errorText = cva("text-xs text-red-600");

export const successText = cva("text-xs text-emerald-600");
