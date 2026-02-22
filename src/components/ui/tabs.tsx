import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface TabsContextValue {
  value: string;
  setValue: (next: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

interface TabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

const Tabs = ({
  defaultValue,
  value,
  onValueChange,
  className,
  children,
}: TabsProps) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const activeValue = value ?? internalValue;

  const setValue = React.useCallback(
    (next: string) => {
      if (value === undefined) {
        setInternalValue(next);
      }
      onValueChange?.(next);
    },
    [onValueChange, value],
  );

  return (
    <TabsContext.Provider value={{ value: activeValue, setValue }}>
      <div className={cn("space-y-4", className)}>{children}</div>
    </TabsContext.Provider>
  );
};

const tabsListVariants = cva(
  "inline-flex w-full max-w-fit items-center gap-1 rounded-pill border border-border bg-surface-2 p-1",
);

const TabsList = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(tabsListVariants(), className)} role="tablist" {...props} />
);

const tabsTriggerVariants = cva(
  "inline-flex min-h-9 items-center justify-center rounded-pill px-4 py-1.5 text-sm font-semibold text-muted-foreground transition duration-180 ease-out hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      active: {
        true: "bg-surface-1 text-foreground shadow-soft",
        false: "",
      },
    },
  },
);

interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tabsTriggerVariants> {
  value: string;
}

const TabsTrigger = ({ className, value, ...props }: TabsTriggerProps) => {
  const context = React.useContext(TabsContext);

  if (!context) {
    throw new Error("TabsTrigger must be used inside Tabs");
  }

  const active = context.value === value;

  return (
    <button
      aria-selected={active}
      className={cn(tabsTriggerVariants({ active, className }))}
      onClick={() => context.setValue(value)}
      role="tab"
      type="button"
      {...props}
    />
  );
};

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = ({ className, value, ...props }: TabsContentProps) => {
  const context = React.useContext(TabsContext);

  if (!context) {
    throw new Error("TabsContent must be used inside Tabs");
  }

  if (context.value !== value) {
    return null;
  }

  return (
    <div
      className={cn("rounded-lg border border-border bg-surface-1 p-5", className)}
      role="tabpanel"
      {...props}
    />
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
