import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetProductList } from "../../components/Query/products";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Slider } from "../../components/ui/slider";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import React from "react";

const Category = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [priceRange, setPriceRange] = useState<number>(9999);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const productsPerPage = 12;

  const { data: products = [], isLoading, isError } = useGetProductList();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const search = urlParams.get("search") || "";
    const price = urlParams.get("price")
      ? parseInt(urlParams.get("price")!)
      : 9999;

    setSearchQuery(search);
    setPriceRange(price);
  }, [location.search]);

  const updateUrlParams = (newSearchQuery: string, newPriceRange: number) => {
    const urlParams = new URLSearchParams();
    if (newSearchQuery) urlParams.set("search", newSearchQuery);
    if (newPriceRange !== 9999)
      urlParams.set("price", newPriceRange.toString());

    navigate(`?${urlParams.toString()}`, { replace: true });
  };

  const filteredProducts = React.useMemo(() => {
    if (!category || products.length === 0) return [];
    return products.filter(
      (product) =>
        product.category?.toLowerCase() === category.toLowerCase() &&
        product.price <= priceRange &&
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        product.in_stock,
    );
  }, [category, priceRange, searchQuery, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

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

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (isError) {
    return <div>Error loading products. Please try again later.</div>;
  }

  return (
    <>
      <div className="text-center text-4xl mb-8">
        {category ? category.toLocaleUpperCase() : "Category Not Found"}
      </div>

      <div className="mb-8 text-center">
        <input
          type="text"
          placeholder="Search Products"
          className="border-2 border-gray-300 p-2 rounded-lg w-1/2"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
            updateUrlParams(e.target.value, priceRange);
          }}
        />
      </div>

      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="text-lg font-bold">Max Price: ${priceRange}</div>
        <Slider
          defaultValue={[9999]}
          max={9999}
          step={10}
          onValueChange={(value) => {
            setPriceRange(value[0]);
            setCurrentPage(1); 
            updateUrlParams(searchQuery, value[0]);
          }}
          className="w-full max-w-xl"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mx-auto">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>
            No products available in this category within the selected price
            range and search criteria.
          </p>
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
