import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageWrapper from "@/components/ui/page-wrapper/PageWrapper";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <PageWrapper>
      <section className="rounded-lg border border-border bg-surface-1 p-10 text-center shadow-soft">
        <h1 className="text-4xl font-bold text-foreground">
          {t("notFound.title")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("notFound.subtitle")}
        </p>
        <Button asChild className="mt-4" variant="primary">
          <Link to="/">
            {t("notFound.backHome")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </section>
    </PageWrapper>
  );
};

export default NotFoundPage;
