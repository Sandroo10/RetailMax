import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageWrapper from "@/components/ui/page-wrapper/PageWrapper";
import { Button } from "@/components/ui/button";

type SupportTopic = "shipping" | "returns" | "securePayments";

interface SupportArticlePageProps {
  topic: SupportTopic;
}

const SupportArticlePage = ({ topic }: SupportArticlePageProps) => {
  const { t } = useTranslation();
  const base = `support.${topic}`;

  const hero = (
    <section className="rounded-lg border border-border bg-surface-1 p-6 shadow-soft sm:p-8">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        <Link className="transition hover:text-brand" to="/">
          {t("support.breadcrumbHome")}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-brand">{t("support.breadcrumbSupport")}</span>
      </div>

      <h1 className="text-[2rem] font-bold leading-tight text-foreground sm:text-[2.4rem]">
        {t(`${base}.title`)}
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
        {t(`${base}.subtitle`)}
      </p>
    </section>
  );

  return (
    <PageWrapper hero={hero}>
      <section className="rounded-lg border border-border bg-surface-1 p-6 shadow-soft sm:p-8">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          {t(`${base}.overviewTitle`)}
        </h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-base">
          {t(`${base}.overviewBody`)}
        </p>

        <ul className="mt-5 grid gap-2 rounded-md border border-border bg-surface-2 p-4 text-sm text-foreground sm:text-base">
          <li className="list-disc pl-2 marker:text-brand">{t(`${base}.highlight1`)}</li>
          <li className="list-disc pl-2 marker:text-brand">{t(`${base}.highlight2`)}</li>
          <li className="list-disc pl-2 marker:text-brand">{t(`${base}.highlight3`)}</li>
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="primary">
            <Link to="/shop">{t("support.primaryAction")}</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/auth">{t("support.secondaryAction")}</Link>
          </Button>
        </div>
      </section>
    </PageWrapper>
  );
};

export default SupportArticlePage;
