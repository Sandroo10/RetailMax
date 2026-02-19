import { cva } from "class-variance-authority";

export const container = cva(
  "relative overflow-hidden rounded-3xl bg-main text-main-foreground",
);

export const overlay = cva(
  "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.25),transparent_40%)]",
);

export const content = cva(
  "relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:items-center",
);

export const title = cva("text-3xl font-bold leading-tight sm:text-4xl");

export const description = cva("max-w-xl text-sm/7 sm:text-base/7");

export const ctaRow = cva("mt-2 flex flex-wrap items-center gap-3");

export const primaryAction = cva(
  "rounded-lg bg-background px-4 py-2 text-sm font-semibold text-main transition hover:bg-surface",
);

export const secondaryAction = cva(
  "rounded-lg border border-main-foreground/60 px-4 py-2 text-sm font-semibold text-main-foreground transition hover:bg-main-foreground/10",
);

export const collage = cva("grid grid-cols-3 gap-3");

export const collageImage = cva("h-20 w-full rounded-xl object-cover sm:h-24");
