import { Link } from "react-router-dom";
import {
  heroCarouselOneImage,
  heroCarouselThreeImage,
  heroCarouselTwoImage,
} from "@/assets";
import {
  collage,
  collageImage,
  container,
  content,
  ctaRow,
  description,
  overlay,
  primaryAction,
  secondaryAction,
  title,
} from "./HomeHero.styles";

const HomeHero = () => {
  return (
    <div className={container()}>
      <div className={overlay()} />
      <div className={content()}>
        <div>
          <h1 className={title()}>Retail essentials with cleaner workflows.</h1>
          <p className={description()}>
            RetailMax combines curated inventory, fast account flows, and secure
            checkout in one place.
          </p>
          <div className={ctaRow()}>
            <Link className={primaryAction()} to="/shop">
              Start Shopping
            </Link>
            <Link className={secondaryAction()} to="/auth">
              Create Account
            </Link>
          </div>
        </div>

        <div className={collage()}>
          <img
            alt="Retail showcase 1"
            className={collageImage()}
            src={heroCarouselOneImage}
          />
          <img
            alt="Retail showcase 2"
            className={collageImage()}
            src={heroCarouselTwoImage}
          />
          <img
            alt="Retail showcase 3"
            className={collageImage()}
            src={heroCarouselThreeImage}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
