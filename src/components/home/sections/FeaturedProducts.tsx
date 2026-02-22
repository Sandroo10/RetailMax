import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import SectionHeader from "@/components/layout/SectionHeader";
import ProductCard from "@/components/product/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useProductList } from "@/hooks/useProducts";
import type { Product } from "@/supabase/products";

type FeaturedFilter = "trending" | "new" | "bestValue";

const sortByFilter = (products: Product[], filter: FeaturedFilter) => {
  if (filter === "new") {
    return [...products]
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      .slice(0, 8);
  }

  if (filter === "bestValue") {
    return [...products].sort((a, b) => a.price - b.price).slice(0, 8);
  }

  return [...products]
    .sort((a, b) => Number(b.in_stock) - Number(a.in_stock))
    .slice(0, 8);
};

const FeaturedProducts = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<FeaturedFilter>("trending");
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [isMobile, setIsMobile] = useState(false);
  const { data: products = [], isLoading, isError } = useProductList();

  const featuredProducts = useMemo(
    () => sortByFilter(products, filter),
    [products, filter],
  );
  const isEmpty = !isLoading && !isError && featuredProducts.length === 0;

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
        : ({
            align: "start",
            containScroll: "trimSnaps",
            loop: false,
          } as const),
    [isMobile],
  );

  return (
    <section className="space-y-5">
      <SectionHeader
        description={t("home.featuredDescription")}
        title={t("home.featuredPicks")}
      />

      <Tabs
        className="space-y-4"
        defaultValue="trending"
        onValueChange={(value) => setFilter(value as FeaturedFilter)}
        value={filter}
      >
        <TabsList>
          <TabsTrigger value="trending">
            {t("home.featuredTrending")}
          </TabsTrigger>
          <TabsTrigger value="new">{t("home.featuredNew")}</TabsTrigger>
          <TabsTrigger value="bestValue">
            {t("home.featuredBestValue")}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              className="rounded-lg border border-border bg-surface-1 p-3 shadow-soft"
              key={index}
            >
              <Skeleton className="aspect-[4/3] w-full rounded-md" />
              <div className="mt-3 space-y-2">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {isError ? (
        <div className="rounded-lg border border-danger/40 bg-danger/10 p-6 text-sm text-danger">
          {t("home.errorFeaturedProducts")}
        </div>
      ) : null}

      {isEmpty ? (
        <div className="rounded-lg border border-border bg-surface-1 p-6 text-sm text-muted-foreground shadow-soft">
          {t("home.featuredEmpty")}
        </div>
      ) : null}

      {!isLoading && !isError && !isEmpty ? (
        <Carousel
          aria-label={t("home.featuredPicks")}
          className="group/featured"
          opts={carouselOptions}
          setApi={setCarouselApi}
        >
          <CarouselContent className="-ml-3 md:-ml-4">
            {featuredProducts.map((product, index) => (
              <CarouselItem
                className="basis-full pl-3 md:basis-1/2 md:pl-4 lg:basis-1/4"
                key={product.id}
              >
                <ProductCard priorityImage={index === 0} product={product} />
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
      ) : null}
    </section>
  );
};

export default FeaturedProducts;
