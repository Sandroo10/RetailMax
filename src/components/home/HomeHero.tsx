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
    <section className="relative overflow-hidden rounded-lg border border-border/80 bg-surface-1 px-5 py-7 shadow-soft sm:px-8 sm:py-10 lg:px-10 lg:py-12">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,hsl(var(--brand)/0.12),transparent_34%),linear-gradient(180deg,hsl(var(--surface-1)),hsl(var(--surface-2)/0.74))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />

      <div className="relative grid items-center gap-8 lg:grid-cols-[1.02fr_1fr]">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-pill border border-brand/30 bg-surface-1/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brand shadow-soft">
            {t("home.heroEyebrow")}
          </div>

          <div className="space-y-3">
            <h1 className="max-w-2xl text-balance text-[2.25rem] font-bold leading-[1.02] text-foreground sm:text-[2.8rem] lg:text-[4rem]">
              {t("home.heroTitle")}
            </h1>
            <p className="max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
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
                  className="flex items-center gap-2 rounded-lg border border-border/80 bg-surface-1/85 px-3 py-2.5 shadow-soft"
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
          <div className="group relative overflow-hidden rounded-lg border border-border/80 bg-surface-2 shadow-lift sm:row-span-2">
            <img
              alt={t("home.showcase1Alt")}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              decoding="async"
              src={heroCarouselOneImage}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-text-1/45 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/20 bg-white/88 p-3 shadow-lift backdrop-blur dark:bg-surface-1/88">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
                {t("home.featuredPicks")}
              </p>
              <p className="mt-1 text-sm font-semibold text-text-1">
                {t("home.promoTitle")}
              </p>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-lg border border-border/80 bg-surface-2 shadow-soft">
            <img
              alt={t("home.showcase2Alt")}
              className="aspect-[4/3] h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              decoding="async"
              loading="lazy"
              src={heroCarouselTwoImage}
            />
          </div>
          <div className="group relative overflow-hidden rounded-lg border border-border/80 bg-surface-2 shadow-soft">
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
