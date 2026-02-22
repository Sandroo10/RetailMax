import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

const SectionHeader = ({
  title,
  description,
  action,
  className,
}: SectionHeaderProps) => {
  return (
    <div className={cn("mb-5 flex items-end justify-between gap-3", className)}>
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
};

export default SectionHeader;
