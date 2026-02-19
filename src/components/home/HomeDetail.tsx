import {
  galleryBusinessImage,
  galleryCashierImage,
  galleryShoppingImage,
} from "@/assets";
import CategoryTiles from "./sections/CategoryTiles";
import FeaturedProducts from "./sections/FeaturedProducts";
import {
  container,
  storyCard,
  storyCopy,
  storyGrid,
  storyImage,
} from "./HomeDetail.styles";

const stories = [
  {
    image: galleryBusinessImage,
    alt: "Business partnership",
    text: "Partnerships built on speed and trust help us move inventory with confidence.",
  },
  {
    image: galleryShoppingImage,
    alt: "Shopping journey",
    text: "The catalog is structured for fast discovery across every major category.",
  },
  {
    image: galleryCashierImage,
    alt: "Checkout support",
    text: "Checkout and profile flows are optimized for fewer clicks and fewer errors.",
  },
];

const HomeDetail = () => {
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
