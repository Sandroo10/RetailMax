import { cva } from "class-variance-authority";

export const container = cva(
  "grid gap-4 rounded-2xl border border-border bg-surface p-4 md:grid-cols-[1fr_auto] md:items-end",
);

export const fieldGroup = cva("grid gap-3");

export const label = cva("text-sm font-semibold text-foreground");

export const input = cva(
  "h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main/40",
);

export const priceGroup = cva("flex items-center gap-3");

export const priceLabel = cva("whitespace-nowrap text-sm font-semibold text-main");

export const sliderWrap = cva("w-full min-w-[14rem]");
