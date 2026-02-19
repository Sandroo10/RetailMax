import { cva } from "class-variance-authority";

export const container = cva(
  "mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8",
);

export const heroSection = cva("rounded-3xl bg-surface p-4 sm:p-6");

export const contentSection = cva("pb-8");
