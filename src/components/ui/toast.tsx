import * as React from "react";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "info";

interface ToastMessage {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  pushToast: (toast: Omit<ToastMessage, "id">) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

const variantStyles: Record<ToastVariant, string> = {
  success: "border-success/30 bg-success/10 text-success",
  error: "border-danger/30 bg-danger/10 text-danger",
  info: "border-brand/25 bg-brand/10 text-brand",
};

const variantIcons: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle2 className="h-4 w-4" />,
  error: <XCircle className="h-4 w-4" />,
  info: <Info className="h-4 w-4" />,
};

const TOAST_DURATION_MS = 3200;

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = React.useState<ToastMessage[]>([]);

  const pushToast = React.useCallback((toast: Omit<ToastMessage, "id">) => {
    setMessages((current) => [
      ...current,
      { ...toast, id: Date.now() + Math.random() },
    ]);
  }, []);

  const dismissToast = React.useCallback((id: number) => {
    setMessages((current) => current.filter((message) => message.id !== id));
  }, []);

  React.useEffect(() => {
    if (!messages.length) {
      return;
    }

    const timers = messages.map((message) =>
      window.setTimeout(() => dismissToast(message.id), TOAST_DURATION_MS),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [dismissToast, messages]);

  return (
    <ToastContext.Provider value={{ pushToast }}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[70] flex w-[min(92vw,24rem)] flex-col gap-2">
        {messages.map((message) => (
          <div
            className="pointer-events-auto animate-toast-in rounded-lg border bg-surface-1 p-3 shadow-lift"
            key={message.id}
            role="status"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <div className={cn("mt-0.5", variantStyles[message.variant])}>
                  {variantIcons[message.variant]}
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-foreground">
                    {message.title}
                  </p>
                  {message.description ? (
                    <p className="text-xs leading-5 text-muted-foreground">
                      {message.description}
                    </p>
                  ) : null}
                </div>
              </div>

              <button
                aria-label={t("common.dismissNotification")}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-brand hover:text-brand"
                onClick={() => dismissToast(message.id)}
                type="button"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
};
