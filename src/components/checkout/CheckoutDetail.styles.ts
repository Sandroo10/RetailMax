import { cva } from "class-variance-authority";

export const container = cva("grid gap-6 lg:grid-cols-[1.2fr_1fr]");

export const cartSection = cva("space-y-4 rounded-2xl border border-border bg-surface p-4");

export const sectionTitle = cva("text-lg font-bold text-foreground");

export const emptyState = cva("rounded-xl bg-background p-5 text-sm text-muted-foreground");

export const total = cva("text-right text-lg font-bold text-main");

export const formSection = cva("rounded-2xl border border-border bg-surface p-4");

export const form = cva("grid gap-3");

export const fieldGroup = cva("grid gap-1.5");

export const label = cva("text-sm font-semibold text-foreground");

export const input = cva(
  "h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main/40",
);

export const errorText = cva("text-xs text-red-600");

export const submitButton = cva(
  "mt-2 rounded-lg bg-main px-4 py-2 text-sm font-semibold text-main-foreground transition hover:opacity-90",
);
