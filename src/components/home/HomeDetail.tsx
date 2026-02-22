import {
  galleryBusinessImage,
  galleryCashierImage,
  galleryShoppingImage,
} from "@/assets";
import { useTranslation } from "react-i18next";
import SectionHeader from "@/components/layout/SectionHeader";
import CategoryTiles from "./sections/CategoryTiles";
import FeaturedProducts from "./sections/FeaturedProducts";

const HomeDetail = () => {
  const { t } = useTranslation();
  const valueCards = [
    {
      image: galleryBusinessImage,
      title: t("home.value1Title"),
      description: t("home.value1Description"),
    },
    {
      image: galleryShoppingImage,
      title: t("home.value2Title"),
      description: t("home.value2Description"),
    },
    {
      image: galleryCashierImage,
      title: t("home.value3Title"),
      description: t("home.value3Description"),
    },
  ];

  return (
    <div className="space-y-12">
      <CategoryTiles />
      <FeaturedProducts />

      <section className="hidden space-y-5 md:block">
        <SectionHeader
          description={t("home.valueSectionDescription")}
          title={t("home.valueSectionTitle")}
        />

        <div className="grid gap-4 md:grid-cols-3">
          {valueCards.map((card) => (
            <article
              className="group hover-lift relative overflow-hidden rounded-lg border border-border bg-surface-1 shadow-soft"
              key={card.title}
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-surface-2">
                <img
                  alt={card.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  decoding="async"
                  loading="lazy"
                  src={card.image}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 space-y-1 p-4">
                <h3 className="text-lg font-bold text-white">{card.title}</h3>
                <p className="text-sm leading-6 text-white/85">{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeDetail;
