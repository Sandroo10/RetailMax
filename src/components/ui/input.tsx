import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex h-11 w-full rounded-md border border-input bg-surface-1 px-3 text-sm text-foreground placeholder:text-muted-foreground shadow-soft transition duration-180 ease-out focus-visible:border-brand/70 focus-visible:ring-2 focus-visible:ring-ring/60 disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
        ref={ref}
        type={type}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  icon?: React.ReactNode;
  required?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

const InputField = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  helperText,
  errorText,
  icon,
  required,
  autoComplete,
  inputMode,
  disabled,
  className,
  "aria-label": ariaLabel,
}: InputFieldProps) => {
  const helperId = helperText ? `${id}-helper` : undefined;
  const errorId = errorText ? `${id}-error` : undefined;

  return (
    <div className={cn("grid gap-1.5", className)}>
      <label className="text-sm font-semibold text-foreground" htmlFor={id}>
        {label}
      </label>

      <div
        className={cn(
          "flex h-11 items-center gap-2 rounded-md border border-input bg-surface-1 px-3 shadow-soft transition duration-180 ease-out focus-within:border-brand/70 focus-within:ring-2 focus-within:ring-ring/60",
          errorText ? "border-danger focus-within:border-danger" : "",
          disabled ? "opacity-60" : "",
        )}
      >
        {icon ? <span className="text-muted-foreground">{icon}</span> : null}
        <input
          aria-describedby={
            [helperId, errorId].filter(Boolean).join(" ") || undefined
          }
          aria-invalid={Boolean(errorText)}
          aria-label={ariaLabel}
          autoComplete={autoComplete}
          className="h-full w-full border-0 bg-transparent px-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          disabled={disabled}
          id={id}
          inputMode={inputMode}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          type={type}
          value={value}
        />
      </div>

      {helperText ? (
        <p className="text-xs text-muted-foreground" id={helperId}>
          {helperText}
        </p>
      ) : null}

      {errorText ? (
        <p className="text-xs text-danger" id={errorId}>
          {errorText}
        </p>
      ) : null}
    </div>
  );
};

export { Input, InputField };
