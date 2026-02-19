import { useState } from "react";
import { useTranslation } from "react-i18next";
import SignInSection from "./sections/SignInSection";
import SignUpSection from "./sections/SignUpSection";
import { container, tab, tabs } from "./AuthDetail.styles";

const AuthDetail = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"signIn" | "signUp">("signIn");

  return (
    <div className={container()}>
      <div className={tabs()}>
        <button
          aria-label={t("auth.showSignInAria")}
          className={tab({ active: activeTab === "signIn" })}
          onClick={() => setActiveTab("signIn")}
          type="button"
        >
          {t("auth.signInTab")}
        </button>
        <button
          aria-label={t("auth.showSignUpAria")}
          className={tab({ active: activeTab === "signUp" })}
          onClick={() => setActiveTab("signUp")}
          type="button"
        >
          {t("auth.signUpTab")}
        </button>
      </div>

      {activeTab === "signIn" ? <SignInSection /> : <SignUpSection />}
    </div>
  );
};

export default AuthDetail;
