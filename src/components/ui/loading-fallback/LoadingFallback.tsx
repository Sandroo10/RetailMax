import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const LoadingFallback = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[40vh] items-center justify-center rounded-lg border border-border bg-surface-1 shadow-soft">
      <div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
        <Loader2 className="h-4 w-4 animate-spin text-brand" />
        {t("common.loading")}
      </div>
    </div>
  );
};

export default LoadingFallback;
