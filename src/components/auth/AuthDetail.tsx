import { useState } from "react";
import SignInSection from "./sections/SignInSection";
import SignUpSection from "./sections/SignUpSection";
import { container, tab, tabs } from "./AuthDetail.styles";

const AuthDetail = () => {
  const [activeTab, setActiveTab] = useState<"signIn" | "signUp">("signIn");

  return (
    <div className={container()}>
      <div className={tabs()}>
        <button
          aria-label="Show sign in form"
          className={tab({ active: activeTab === "signIn" })}
          onClick={() => setActiveTab("signIn")}
          type="button"
        >
          Sign in
        </button>
        <button
          aria-label="Show sign up form"
          className={tab({ active: activeTab === "signUp" })}
          onClick={() => setActiveTab("signUp")}
          type="button"
        >
          Sign up
        </button>
      </div>

      {activeTab === "signIn" ? <SignInSection /> : <SignUpSection />}
    </div>
  );
};

export default AuthDetail;
