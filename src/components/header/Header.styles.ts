import { cva } from "class-variance-authority";

export const shell = cva(
  "sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur",
);

export const container = cva(
  "mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8",
);

export const brandLink = cva("inline-flex items-center gap-3");

export const brandImage = cva("h-10 w-auto rounded-md");

export const brandText = cva("font-heading text-lg font-bold text-main");

export const nav = cva("hidden items-center gap-1 md:flex");

export const navLink = cva(
  "rounded-md px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-surface hover:text-main",
  {
    variants: {
      active: {
        true: "bg-surface text-main",
        false: "",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

export const actionGroup = cva("relative flex items-center gap-2");

export const iconButton = cva(
  "inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-border bg-background px-3 text-sm font-semibold text-foreground transition hover:border-main hover:text-main",
);

export const cartBadge = cva(
  "absolute -right-1 -top-1 rounded-full bg-main px-1.5 text-xs font-bold text-main-foreground",
);

export const mobileMenu = cva("flex items-center gap-2 md:hidden");

export const mobilePanel = cva("flex flex-col gap-2 p-4");

export const mobileLink = cva(
  "rounded-md bg-surface px-3 py-2 text-sm font-semibold text-foreground",
);
