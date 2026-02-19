import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <div className={container()}>
      <div className={overlay()} />
      <div className={content()}>
        <div>
          <h1 className={title()}>{t("home.heroTitle")}</h1>
          <p className={description()}>{t("home.heroSubtitle")}</p>
          <div className={ctaRow()}>
            <Link className={primaryAction()} to="/shop">
              {t("home.startShopping")}
            </Link>
            <Link className={secondaryAction()} to="/auth">
              {t("home.createAccount")}
            </Link>
          </div>
        </div>

        <div className={collage()}>
          <img
            alt={t("home.showcase1Alt")}
            className={collageImage()}
            src={heroCarouselOneImage}
          />
          <img
            alt={t("home.showcase2Alt")}
            className={collageImage()}
            src={heroCarouselTwoImage}
          />
          <img
            alt={t("home.showcase3Alt")}
            className={collageImage()}
            src={heroCarouselThreeImage}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
