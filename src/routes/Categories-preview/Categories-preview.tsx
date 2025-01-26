import CategoryPreview from "../../components/category-preview/category-preview";

const categoryList = [
  "electronics",
  "clothing",
  "toys",
  "beauty products",
  "gym equipment",
];

export const CategoriesPreview = () => {
  // Predefine empty products for each category
  const categories = categoryList.reduce(
    (acc, category) => {
      acc[category] = []; // Empty array, ready to populate with products if needed
      return acc;
    },
    {} as Record<
      string,
      {
        id: number;
        name: string;
        image_url: string;
        price: number;
        quantity: number;
      }[]
    >,
  );

  return (
    <div className="justify-between w-full px-4">
      {categoryList.map((title) => {
        const products = categories[title]; // Always an empty array for now
        return <CategoryPreview key={title} title={title} product={products} />;
      })}
    </div>
  );
};

export default CategoriesPreview;
