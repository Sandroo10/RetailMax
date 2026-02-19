import { cva } from "class-variance-authority";

export const container = cva(
  "relative overflow-hidden rounded-3xl bg-main text-main-foreground",
);

export const backdrop = cva(
  "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.16),transparent_45%)]",
);

export const content = cva("relative flex flex-col gap-3 p-6 sm:p-8");

export const title = cva("text-3xl font-bold sm:text-4xl");

export const subtitle = cva("max-w-2xl text-sm/6 sm:text-base/7");
