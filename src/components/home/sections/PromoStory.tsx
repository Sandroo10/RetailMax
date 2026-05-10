import { ArrowRight, PackageCheck, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  galleryBusinessImage,
  galleryCashierImage,
  galleryShoppingImage,
} from "@/assets";
import { Button } from "@/components/ui/button";

const PromoStory = () => {
  const { t } = useTranslation();
  const thumbs = [
    galleryBusinessImage,
    galleryShoppingImage,
    galleryCashierImage,
  ];

  return (
    <section className="grid overflow-hidden rounded-lg border border-border/80 bg-surface-1 shadow-soft lg:grid-cols-[1.05fr_1fr]">
      <div className="relative min-h-[24rem] overflow-hidden bg-surface-2">
        <img
          alt={t("home.promoImageAlt")}
          className="h-full min-h-[24rem] w-full object-cover"
          decoding="async"
          loading="lazy"
          src={galleryShoppingImage}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-text-1/80 via-text-1/28 to-transparent" />
        <div className="absolute left-5 top-5 rounded-pill border border-white/20 bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-text-1 shadow-soft backdrop-blur">
          {t("home.promoEyebrow")}
        </div>
        <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-white/20 bg-white/92 p-4 shadow-lift backdrop-blur dark:bg-surface-1/92">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
                {t("home.promoBadge")}
              </p>
              <h3 className="mt-1 text-xl font-bold text-text-1">
                {t("home.promoCardTitle")}
              </h3>
            </div>
            <div className="rounded-pill bg-brand px-3 py-1 text-sm font-extrabold text-primary-foreground">
              4.9
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-pill border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-brand">
          <Sparkles className="h-3.5 w-3.5" />
          {t("home.promoEyebrow")}
        </div>
        <h2 className="max-w-xl text-balance text-3xl font-bold leading-tight text-foreground sm:text-4xl">
          {t("home.promoTitle")}
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
          {t("home.promoCopy")}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border/80 bg-surface-2 p-4">
            <PackageCheck className="mb-3 h-5 w-5 text-brand" />
            <p className="text-sm font-bold text-foreground">
              {t("home.promoPoint1")}
            </p>
          </div>
          <div className="rounded-lg border border-border/80 bg-surface-2 p-4">
            <ShieldCheck className="mb-3 h-5 w-5 text-brand" />
            <p className="text-sm font-bold text-foreground">
              {t("home.promoPoint2")}
            </p>
          </div>
          <div className="rounded-lg border border-border/80 bg-surface-2 p-4">
            <Sparkles className="mb-3 h-5 w-5 text-brand" />
            <p className="text-sm font-bold text-foreground">
              {t("home.promoPoint3")}
            </p>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Button asChild size="lg" variant="primary">
            <Link aria-label={t("home.promoAria")} to="/shop">
              {t("home.promoAction")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            {thumbs.map((thumb, index) => (
              <img
                alt=""
                className="h-12 w-12 rounded-md border border-border object-cover shadow-soft"
                key={thumb}
                loading="lazy"
                src={thumb}
                style={{ zIndex: thumbs.length - index }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoStory;
