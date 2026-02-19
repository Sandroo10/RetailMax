import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trigger } from "./LanguageToggle.styles";

const LanguageToggle = () => {
  const { i18n, t } = useTranslation();

  const currentLanguageLabel = i18n.language === "ka" ? "KA" : "EN";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label={t("header.languageAria")}
          className={trigger()}
          type="button"
        >
          {currentLanguageLabel}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background">
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
