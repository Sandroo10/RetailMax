import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SectionHeader from "@/components/layout/SectionHeader";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { categoryDefinitions } from "@/data/categories";

const CategoryTiles = () => {
  const { t } = useTranslation();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateMobileState = () => setIsMobile(mediaQuery.matches);

    updateMobileState();
    mediaQuery.addEventListener("change", updateMobileState);

    return () => {
      mediaQuery.removeEventListener("change", updateMobileState);
    };
  }, []);

  useEffect(() => {
    if (!carouselApi || !isMobile) {
      return;
    }

    const autoScrollId = window.setInterval(() => {
      carouselApi.scrollNext();
    }, 3500);

    return () => {
      window.clearInterval(autoScrollId);
    };
  }, [carouselApi, isMobile]);

  const carouselOptions = useMemo(
    () =>
      isMobile
        ? ({ align: "start", loop: true } as const)
        : ({ align: "start", containScroll: "trimSnaps", loop: false } as const),
    [isMobile],
  );

  return (
    <section aria-label={t("home.browseCategoriesAria")} className="space-y-5">
      <SectionHeader
        action={
          <Link
            className="text-sm font-semibold text-brand transition hover:text-brand-2"
            to="/shop"
          >
            {t("home.viewAll")}
          </Link>
        }
        description={t("home.shopByCategoryDescription")}
        title={t("home.shopByCategoryTitle")}
      />

      <Carousel
        aria-label={t("home.browseCategoriesAria")}
        className="group/category"
        opts={carouselOptions}
        setApi={setCarouselApi}
      >
        <CarouselContent className="-ml-3 md:-ml-4">
          {categoryDefinitions.map((category) => (
            <CarouselItem
              className="basis-full pl-3 md:basis-1/2 md:pl-4 lg:basis-1/3"
              key={category.slug}
            >
              <article className="group hover-lift relative h-full overflow-hidden rounded-lg border border-border bg-surface-1 shadow-soft">
                <Link
                  aria-label={t("home.openCategoryAria", {
                    category: t(category.labelKey),
                  })}
                  to={`/shop/${category.slug}`}
                >
                  <div className="relative aspect-[16/11] overflow-hidden bg-surface-2">
                    <img
                      alt={t(category.labelKey)}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
                      decoding="async"
                      loading="lazy"
                      src={category.image}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 space-y-1.5 p-4">
                    <h3 className="text-lg font-bold text-white">{t(category.labelKey)}</h3>
                    <p className="line-clamp-1 text-sm text-white/80">
                      {t(category.shortDescriptionKey)}
                    </p>
                    <div className="inline-flex items-center gap-1 text-sm font-semibold text-brand-2">
                      {t("home.explore")}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          aria-label={t("carousel.previousSlide")}
          className="left-3 hidden h-10 w-10 border-border/70 bg-surface-1/90 backdrop-blur md:inline-flex"
          variant="secondary"
        />
        <CarouselNext
          aria-label={t("carousel.nextSlide")}
          className="right-3 hidden h-10 w-10 border-border/70 bg-surface-1/90 backdrop-blur md:inline-flex"
          variant="secondary"
        />
      </Carousel>
    </section>
  );
};

export default CategoryTiles;
