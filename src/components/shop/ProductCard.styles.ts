import { cva } from "class-variance-authority";

export const card = cva(
  "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition hover:-translate-y-0.5 hover:border-main/40",
);

export const imageWrap = cva(
  "relative aspect-[4/3] w-full overflow-hidden bg-surface",
);

export const image = cva(
  "h-full w-full object-cover transition duration-300 group-hover:scale-105",
);

export const content = cva("flex flex-1 flex-col gap-3 p-4");

export const name = cva("line-clamp-1 text-base font-semibold text-foreground");

export const description = cva("line-clamp-2 text-sm text-muted-foreground");

export const footer = cva("mt-auto flex items-center justify-between gap-3");

export const price = cva("text-lg font-bold text-main");

export const button = cva(
  "rounded-lg bg-main px-3 py-2 text-sm font-semibold text-main-foreground transition hover:opacity-90",
);
