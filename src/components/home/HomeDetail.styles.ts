import { cva } from "class-variance-authority";

export const container = cva("flex flex-col gap-8");

export const storyGrid = cva("grid gap-4 md:grid-cols-3");

export const storyCard = cva(
  "overflow-hidden rounded-2xl border border-border bg-surface",
);

export const storyImage = cva("h-44 w-full object-cover");

export const storyCopy = cva("p-4 text-sm text-muted-foreground");
