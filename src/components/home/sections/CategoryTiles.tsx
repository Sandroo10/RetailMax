import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { categoryDefinitions } from "@/data/categories";
import {
  action,
  body,
  copy,
  image,
  section,
  tile,
  title,
} from "./CategoryTiles.styles";

const CategoryTiles = () => {
  const { t } = useTranslation();

  return (
    <section aria-label={t("home.browseCategoriesAria")} className={section()}>
      {categoryDefinitions.map((category) => (
        <article className={tile()} key={category.slug}>
          <img alt={t(category.labelKey)} className={image()} src={category.image} />
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
      ))}
    </section>
  );
};

export default CategoryTiles;
