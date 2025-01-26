import Navigation from "../navigation/navigation";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="w-full overflow-hidden">
      <Navigation />
      <div className="m-0 sm:px-28 px-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
