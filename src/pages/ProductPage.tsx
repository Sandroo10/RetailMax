import ProductDetail from "@/components/product/ProductDetail";
import ProductHero from "@/components/product/ProductHero";
import PageWrapper from "@/components/ui/page-wrapper/PageWrapper";

const ProductPage = () => {
  return (
    <PageWrapper hero={<ProductHero />}>
      <ProductDetail />
    </PageWrapper>
  );
};

export default ProductPage;
