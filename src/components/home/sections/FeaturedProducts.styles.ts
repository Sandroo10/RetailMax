import { cva } from "class-variance-authority";

export const wrapper = cva("space-y-4");

export const heading = cva("text-xl font-bold text-foreground");

export const grid = cva("grid gap-4 sm:grid-cols-2 lg:grid-cols-4");

export const state = cva("rounded-xl border border-border bg-surface p-6 text-sm");
