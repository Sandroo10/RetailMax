import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { categoryDefinitions } from "@/data/categories";
import {
  action,
  body,
  copy,
  image,
  promoAction,
  promoBody,
  promoCopy,
  promoEyebrow,
  promoTile,
  promoTitle,
  section,
  tile,
  title,
} from "./CategoryTiles.styles";

const CategoryTiles = () => {
  const { t } = useTranslation();

  return (
    <section aria-label={t("home.browseCategoriesAria")} className={section()}>
      {categoryDefinitions.map((category, index) => (
        <Fragment key={category.slug}>
          <article className={tile()}>
            <img
              alt={t(category.labelKey)}
              className={image()}
              src={category.image}
            />
            <div className={body()}>
              <h3 className={title()}>{t(category.labelKey)}</h3>
              <p className={copy()}>{t(category.shortDescriptionKey)}</p>
              <Link
                aria-label={t("home.openCategoryAria", {
                  category: t(category.labelKey),
                })}
                className={action()}
                to={`/shop/${category.slug}`}
              >
                {t("home.viewCategory")}
              </Link>
            </div>
          </article>

          {index === 3 ? (
            <article className={promoTile()}>
              <div className={promoBody()}>
                <p className={promoEyebrow()}>{t("home.promoEyebrow")}</p>
                <h3 className={promoTitle()}>{t("home.promoTitle")}</h3>
                <p className={promoCopy()}>{t("home.promoCopy")}</p>
                <Link
                  aria-label={t("home.promoAria")}
                  className={promoAction()}
                  to="/shop"
                >
                  {t("home.promoAction")}
                </Link>
              </div>
            </article>
          ) : null}
        </Fragment>
      ))}
    </section>
  );
};

export default CategoryTiles;
