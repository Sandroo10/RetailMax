import {
  galleryBusinessImage,
  galleryCashierImage,
  galleryShoppingImage,
} from "@/assets";
import { useTranslation } from "react-i18next";
import CategoryTiles from "./sections/CategoryTiles";
import FeaturedProducts from "./sections/FeaturedProducts";
import {
  container,
  storyCard,
  storyCopy,
  storyGrid,
  storyImage,
} from "./HomeDetail.styles";

const HomeDetail = () => {
  const { t } = useTranslation();

  const stories = [
    {
      image: galleryBusinessImage,
      alt: t("home.story1Alt"),
      text: t("home.story1Text"),
    },
    {
      image: galleryShoppingImage,
      alt: t("home.story2Alt"),
      text: t("home.story2Text"),
    },
    {
      image: galleryCashierImage,
      alt: t("home.story3Alt"),
      text: t("home.story3Text"),
    },
  ];

  return (
    <div className={container()}>
      <CategoryTiles />
      <FeaturedProducts />

      <section className={storyGrid()}>
        {stories.map((story) => (
          <article className={storyCard()} key={story.alt}>
            <img alt={story.alt} className={storyImage()} src={story.image} />
            <p className={storyCopy()}>{story.text}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default HomeDetail;
