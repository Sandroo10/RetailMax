import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CheckoutHero = () => {
  const { t } = useTranslation();
  const steps = [
    t("checkout.stepCart"),
    t("checkout.stepDetails"),
    t("checkout.stepPayment"),
    t("checkout.stepConfirm"),
  ];

  return (
    <section className="rounded-lg border border-border bg-surface-1 p-6 shadow-soft sm:p-8">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        <Link className="transition hover:text-brand" to="/">
          {t("navigation.home")}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link className="transition hover:text-brand" to="/shop">
          {t("navigation.shop")}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-brand">{t("navigation.checkout")}</span>
      </div>

      <h1 className="text-[2rem] font-bold leading-tight text-foreground sm:text-[2.5rem]">
        {t("checkout.heroTitle")}
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
        {t("checkout.heroSubtitle")}
      </p>

      <ol className="mt-6 grid gap-2 sm:grid-cols-4">
        {steps.map((step, index) => (
          <li
            className="flex items-center gap-2 rounded-md border border-border bg-surface-2 px-3 py-2 text-sm"
            key={step}
          >
            <span
              className={[
                "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                index < 2
                  ? "bg-brand text-primary-foreground"
                  : "bg-surface-3 text-muted-foreground",
              ].join(" ")}
            >
              {index + 1}
            </span>
            <span className="font-semibold text-foreground">{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default CheckoutHero;
