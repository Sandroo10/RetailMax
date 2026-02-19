import PageWrapper from "@/components/ui/page-wrapper/PageWrapper";
import { useTranslation } from "react-i18next";
import { subtitle, title } from "./NotFoundPage.styles";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <PageWrapper hero={<h1 className={title()}>{t("notFound.title")}</h1>}>
      <p className={subtitle()}>{t("notFound.subtitle")}</p>
    </PageWrapper>
  );
};

export default NotFoundPage;
