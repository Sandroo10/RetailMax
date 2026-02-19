import AuthDetail from "@/components/auth/AuthDetail";
import AuthHero from "@/components/auth/AuthHero";
import PageWrapper from "@/components/ui/page-wrapper/PageWrapper";

const AuthPage = () => {
  return (
    <PageWrapper hero={<AuthHero />}>
      <AuthDetail />
    </PageWrapper>
  );
};

export default AuthPage;
