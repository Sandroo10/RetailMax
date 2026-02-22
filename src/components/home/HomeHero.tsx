import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  heroCarouselOneImage,
  heroCarouselThreeImage,
  heroCarouselTwoImage,
} from "@/assets";
import { Button } from "@/components/ui/button";

const HomeHero = () => {
  const { t } = useTranslation();
  const trustItems = [
    {
      title: t("home.trustFastCheckout"),
      icon: CheckCircle2,
    },
    {
      title: t("home.trustCuratedPicks"),
      icon: Sparkles,
    },
    {
      title: t("home.trustSecurePayments"),
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-lg border border-border bg-surface-1 px-6 py-8 shadow-soft sm:px-8 sm:py-10 lg:px-10 lg:py-12">
      <div className="pointer-events-none absolute -left-12 -top-16 h-44 w-44 rounded-full bg-brand/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 top-10 h-56 w-56 rounded-full bg-brand/10 blur-3xl" />

      <div className="relative grid items-center gap-8 lg:grid-cols-[1.08fr_1fr]">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-pill border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            {t("home.heroEyebrow")}
          </div>

          <div className="space-y-3">
            <h1 className="max-w-2xl text-balance text-[2rem] font-bold leading-[1.08] text-foreground sm:text-[2.4rem] lg:text-[3.2rem]">
              {t("home.heroTitle")}
            </h1>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              {t("home.heroSubtitle")}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="primary">
              <Link to="/shop">
                {t("home.startShopping")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/auth">{t("home.createAccount")}</Link>
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {trustItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  className="flex items-center gap-2 rounded-md border border-border bg-surface-2 px-3 py-2"
                  key={item.title}
                >
                  <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand/15 text-brand">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="group relative overflow-hidden rounded-lg border border-border bg-surface-2 sm:row-span-2">
            <img
              alt={t("home.showcase1Alt")}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              decoding="async"
              src={heroCarouselOneImage}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-text-1/45 via-transparent to-transparent" />
          </div>
          <div className="group relative overflow-hidden rounded-lg border border-border bg-surface-2">
            <img
              alt={t("home.showcase2Alt")}
              className="aspect-[4/3] h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              decoding="async"
              loading="lazy"
              src={heroCarouselTwoImage}
            />
          </div>
          <div className="group relative overflow-hidden rounded-lg border border-border bg-surface-2">
            <img
              alt={t("home.showcase3Alt")}
              className="aspect-[4/3] h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              decoding="async"
              loading="lazy"
              src={heroCarouselThreeImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
