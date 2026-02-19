import { container, subtitle, title } from "./AuthHero.styles";

const AuthHero = () => {
  return (
    <div className={container()}>
      <h1 className={title()}>Account Access</h1>
      <p className={subtitle()}>
        Sign in to continue shopping or register a new account to personalize
        your profile.
      </p>
    </div>
  );
};

export default AuthHero;
