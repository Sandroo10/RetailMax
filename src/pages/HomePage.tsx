import HomeDetail from "@/components/home/HomeDetail";
import HomeHero from "@/components/home/HomeHero";
import PageWrapper from "@/components/ui/page-wrapper/PageWrapper";

const HomePage = () => {
  return (
    <PageWrapper hero={<HomeHero />}>
      <HomeDetail />
    </PageWrapper>
  );
};

export default HomePage;
