import ProductCard from '../ProductCard/ProductCard';
import { Link } from 'react-router-dom';

interface Product {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number; 
}

interface CategoryPreviewProps {
    title: string;
    product: Product[];
}

const CategoryPreview = ({ title, product }: CategoryPreviewProps) => {
    return (
        <div className="flex flex-col mb-8 w-full">
            <h2 className="text-2xl mb-6">
                <Link to={title} className="cursor-pointer hover:underline">
                    {title.toUpperCase()}
                </Link>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-screen-xl mx-auto">
                {product
                    .filter((_, index) => index < 4)
                    .map((product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
            </div>
        </div>
    );
};

export default CategoryPreview;
