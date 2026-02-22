import { Outlet } from "react-router-dom";
import Footer from "@/components/nav/Footer";
import Header from "@/components/nav/Header";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="min-h-[calc(100vh-11rem)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
