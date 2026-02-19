import { NavLink } from "react-router-dom";
import { categoryDefinitions } from "@/data/categories";
import { container, link } from "./CategoryLinks.styles";

interface CategoryLinksProps {
  categorySlug?: string;
}

const CategoryLinks = ({ categorySlug }: CategoryLinksProps) => {
  return (
    <nav aria-label="Product categories" className={container()}>
      <NavLink className={link({ active: !categorySlug })} to="/shop">
        All
      </NavLink>
      {categoryDefinitions.map((category) => (
        <NavLink
          className={link({ active: category.slug === categorySlug })}
          key={category.slug}
          to={`/shop/${category.slug}`}
        >
          {category.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default CategoryLinks;
