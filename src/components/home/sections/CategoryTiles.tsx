import { Link } from "react-router-dom";
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
  return (
    <section aria-label="Browse categories" className={section()}>
      {categoryDefinitions.map((category) => (
        <article className={tile()} key={category.slug}>
          <img alt={category.label} className={image()} src={category.image} />
          <div className={body()}>
            <h3 className={title()}>{category.label}</h3>
            <p className={copy()}>{category.shortDescription}</p>
            <Link
              aria-label={`Open ${category.label}`}
              className={action()}
              to={`/shop/${category.slug}`}
            >
              View category
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
};

export default CategoryTiles;
