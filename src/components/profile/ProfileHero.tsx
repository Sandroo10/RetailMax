import { container, subtitle, title } from "./ProfileHero.styles";

const ProfileHero = () => {
  return (
    <div className={container()}>
      <h1 className={title()}>Profile</h1>
      <p className={subtitle()}>
        Manage your display name and profile image for the storefront.
      </p>
    </div>
  );
};

export default ProfileHero;
