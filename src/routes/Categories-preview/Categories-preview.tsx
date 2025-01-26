import { useContext } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview';
import { CategoriesContext } from '../../contexts/Categories.context';

interface Category {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number; // Add this property
}

interface CategoriesContextType {
    categories: Record<string, Category[]>; // A dictionary where keys are category titles, and values are arrays of products
}

export const CategoriesPreview = () => {
    const { categories } = useContext(CategoriesContext) as CategoriesContextType;

    return (
        <div className="justify-between w-full px-4">
            {Object.keys(categories).map((title) => {
                const products = categories[title]; // Access products by category title
                return (
                    <CategoryPreview
                        key={title}
                        title={title}
                        product={products} // Update prop name to match expected usage in `CategoryPreview`
                    />
                );
            })}
        </div>
    );
};

export default CategoriesPreview;
