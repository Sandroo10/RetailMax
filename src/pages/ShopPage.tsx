import ShopDetail from "@/components/shop/ShopDetail";
import ShopHero from "@/components/shop/ShopHero";
import PageWrapper from "@/components/ui/page-wrapper/PageWrapper";

const ShopPage = () => {
  return (
    <PageWrapper hero={<ShopHero />}>
      <ShopDetail />
    </PageWrapper>
  );
};

export default ShopPage;
