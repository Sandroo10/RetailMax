import { cva } from "class-variance-authority";

export const loadingState = cva(
  "rounded-2xl border border-border bg-surface p-8 text-center text-sm",
);

export const wrapper = cva(
  "grid gap-6 rounded-3xl border border-border bg-background p-4 sm:p-6 lg:grid-cols-2",
);

export const imageWrap = cva("overflow-hidden rounded-2xl border border-border bg-surface");

export const image = cva("h-full w-full object-cover");

export const content = cva("flex flex-col gap-4");

export const name = cva("text-2xl font-bold text-foreground");

export const description = cva("text-sm leading-7 text-muted-foreground");

export const price = cva("text-2xl font-bold text-main");

export const stock = cva("text-sm font-semibold", {
  variants: {
    inStock: {
      true: "text-emerald-600",
      false: "text-red-600",
    },
  },
  defaultVariants: {
    inStock: true,
  },
});

export const addButton = cva(
  "mt-2 w-fit rounded-lg bg-main px-4 py-2 text-sm font-semibold text-main-foreground transition hover:opacity-90",
);
