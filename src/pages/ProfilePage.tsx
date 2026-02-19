import ProfileDetail from "@/components/profile/ProfileDetail";
import ProfileHero from "@/components/profile/ProfileHero";
import PageWrapper from "@/components/ui/page-wrapper/PageWrapper";

const ProfilePage = () => {
  return (
    <PageWrapper hero={<ProfileHero />}>
      <ProfileDetail />
    </PageWrapper>
  );
};

export default ProfilePage;
