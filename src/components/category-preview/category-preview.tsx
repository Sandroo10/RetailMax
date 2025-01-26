import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";
import { useGetProductList } from "../Query/products";

interface Product {
  id: number;
  name: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CategoryPreviewProps {
  title: string;
  product: Product[];
}

const CategoryPreview = ({ title }: CategoryPreviewProps) => {
  const { data: products, isLoading, isError, error } = useGetProductList();

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (isError) {
    return <div>Error loading products: {error?.message}</div>;
  }

  // Filter products for the current category
  const filteredProducts = products?.filter(
    (product) => product.category.toLowerCase() === title.toLowerCase(),
  );

  return (
    <div className="flex flex-col mb-8 w-full">
      <h2 className="text-2xl mb-6">
        <Link to={title} className="cursor-pointer hover:underline dark:text-white">
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-screen-xl mx-auto">
        {filteredProducts
          ?.slice(0, 4)
          .map((product) => <ProductCard product={product} key={product.id} />)}
      </div>
    </div>
  );
};

export default CategoryPreview;
