import { cva } from "class-variance-authority";

export const container = cva("rounded-3xl bg-surface p-6 sm:p-8");

export const title = cva("text-3xl font-bold text-foreground sm:text-4xl");

export const subtitle = cva("mt-2 max-w-2xl text-sm text-muted-foreground");
