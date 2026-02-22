import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const Container = ({ children, className, as: Tag = "div" }: ContainerProps) => {
  return <Tag className={cn("mx-auto w-full max-w-app px-4 sm:px-6 lg:px-8", className)}>{children}</Tag>;
};

export default Container;
