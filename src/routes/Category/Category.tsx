import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { CategoriesContext } from '../../contexts/Categories.context';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Product } from '../../contexts/types';
import { Slider } from "../../components/ui/slider";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../../components/ui/pagination";

const Category = () => {
    const { category } = useParams();
    const { categories } = useContext(CategoriesContext);
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [priceRange, setPriceRange] = useState<number>(9999); 
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const productsPerPage = 12;

    useEffect(() => {
        if (category && categories[category]) {
            setProducts(categories[category]);
        } else {
            setProducts([]);
        }
    }, [category, categories]);

    useEffect(() => {
        const filtered = products.filter((product) => 
            product.price <= priceRange && 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) 
        );
        setFilteredProducts(filtered);
    }, [priceRange, products, searchQuery]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <div className="text-center text-4xl mb-8">
                {category ? category.toLocaleUpperCase() : 'Category Not Found'}
            </div>

            <div className="mb-8 text-center">
                <input
                    type="text"
                    placeholder="Search Products"
                    className="border-2 border-gray-300 p-2 rounded-lg w-1/2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="flex flex-col items-center gap-4 mb-8">
                <div className="text-lg font-bold">Max Price: ${priceRange}</div>
                <Slider
                    defaultValue={[9999]} 
                    max={9999} 
                    step={10} 
                    onValueChange={(value) => setPriceRange(value[0])} 
                    className="w-full max-w-xl"
                />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mx-auto">
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p>No products available in this category within the selected price range and search criteria.</p>
                )}
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        {currentPage > 1 ? (
                            <PaginationPrevious href="#" onClick={prevPage} />
                        ) : (
                            <span className="text-gray-300 cursor-not-allowed">Prev</span>
                        )}
                    </PaginationItem>

                    {[...Array(totalPages).keys()].map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href="#"
                                onClick={() => setCurrentPage(index + 1)}
                                isActive={currentPage === index + 1}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    
                    {totalPages > 5 && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}

                    <PaginationItem>
                        {currentPage < totalPages ? (
                            <PaginationNext href="#" onClick={nextPage} />
                        ) : (
                            <span className="text-gray-300 cursor-not-allowed">Next</span>
                        )}
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    );
};

export default Category;
