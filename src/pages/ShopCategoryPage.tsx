import { useParams } from "react-router-dom";
import ShopDetail from "@/components/shop/ShopDetail";
import ShopHero from "@/components/shop/ShopHero";
import PageWrapper from "@/components/ui/page-wrapper/PageWrapper";

const ShopCategoryPage = () => {
  const { category } = useParams<{ category: string }>();

  return (
    <PageWrapper hero={<ShopHero categorySlug={category} />}>
      <ShopDetail categorySlug={category} />
    </PageWrapper>
  );
};

export default ShopCategoryPage;
