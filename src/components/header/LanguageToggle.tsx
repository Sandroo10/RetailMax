import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageToggle = () => {
  const { i18n, t } = useTranslation();

  const currentLanguageLabel = i18n.language === "ka" ? "KA" : "EN";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label={t("header.languageAria")}
          className="inline-flex h-10 items-center gap-1.5 rounded-pill border border-border bg-surface-1 px-3 text-xs font-semibold text-foreground shadow-soft transition duration-180 hover:border-brand/50"
          type="button"
        >
          <Languages className="h-3.5 w-3.5 text-muted-foreground" />
          {currentLanguageLabel}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => i18n.changeLanguage("en")}>
          {t("header.languageEnglish")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => i18n.changeLanguage("ka")}>
          {t("header.languageGeorgian")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
