import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/header/Header";
import { main, shell } from "./AppLayout.styles";

const AppLayout = () => {
  return (
    <div className={shell()}>
      <Header />
      <div className={main()}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
