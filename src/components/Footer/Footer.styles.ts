import { cva } from "class-variance-authority";

export const shell = cva("border-t border-border bg-surface");

export const container = cva(
  "mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 lg:px-8",
);

export const title = cva("font-heading text-xl font-semibold text-main");

export const subtitle = cva("max-w-xl text-sm text-muted-foreground");

export const socials = cva("flex items-center gap-3");

export const socialLink = cva(
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition hover:border-main",
);

export const socialIcon = cva("h-5 w-5 object-contain");
