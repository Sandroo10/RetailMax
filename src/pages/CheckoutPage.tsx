import CheckoutDetail from "@/components/checkout/CheckoutDetail";
import CheckoutHero from "@/components/checkout/CheckoutHero";
import PageWrapper from "@/components/ui/page-wrapper/PageWrapper";

const CheckoutPage = () => {
  return (
    <PageWrapper hero={<CheckoutHero />}>
      <CheckoutDetail />
    </PageWrapper>
  );
};

export default CheckoutPage;
