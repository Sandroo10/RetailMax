import { useTranslation } from "react-i18next";
import { container, message } from "./LoadingFallback.styles";

const LoadingFallback = () => {
  const { t } = useTranslation();

  return (
    <div className={container()}>
      <p className={message()}>{t("common.loading")}</p>
    </div>
  );
};

export default LoadingFallback;
