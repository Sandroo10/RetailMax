import { Menu, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCartContext } from "@/hooks/useCartContext";
import { useUserContext } from "@/hooks/useUserContext";
import { useSignOutMutation } from "@/hooks/useAuthMutations";
import { defaultProfileImage, siteLogo } from "@/assets";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartDropdown from "./CartDropdown";
import ThemeToggle from "./ThemeToggle";
import {
  actionGroup,
  brandImage,
  brandLink,
  brandText,
  cartBadge,
  container,
  iconButton,
  mobileLink,
  mobileMenu,
  mobilePanel,
  nav,
  navLink,
  shell,
} from "./Header.styles";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/shop", label: "Shop" },
  { path: "/checkout", label: "Checkout" },
];

const Header = () => {
  const location = useLocation();
  const { currentUser, profilePicture } = useUserContext();
  const { isCartOpen, setIsCartOpen, totalQuantity } = useCartContext();
  const { mutate: signOut } = useSignOutMutation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const profileImage = useMemo(
    () => profilePicture || defaultProfileImage,
    [profilePicture],
  );

  const closeOverlays = () => {
    setIsCartOpen(false);
    setIsMobileOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <header className={shell()}>
      <div className={container()}>
        <Link aria-label="RetailMax Home" className={brandLink()} to="/">
          <img alt="RetailMax logo" className={brandImage()} src={siteLogo} />
          <span className={brandText()}>RetailMax</span>
        </Link>

        <nav className={nav()}>
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) => navLink({ active: isActive })}
              key={item.path}
              to={item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={actionGroup()}>
          {currentUser ? (
            <Link
              aria-label="Go to profile"
              className={iconButton()}
              to="/profile"
            >
              <img
                alt="Profile"
                className="h-6 w-6 rounded-full object-cover"
                src={profileImage}
              />
            </Link>
          ) : (
            <Link
              aria-label="Open auth page"
              className={iconButton()}
              to="/auth"
            >
              Sign In
            </Link>
          )}

          {currentUser && (
            <button
              aria-label="Sign out"
              className={iconButton()}
              onClick={() => signOut()}
              type="button"
            >
              Sign Out
            </button>
          )}

          <button
            aria-label="Toggle cart"
            className={iconButton()}
            onClick={toggleCart}
            type="button"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className={cartBadge()}>{totalQuantity}</span>
          </button>

          <ThemeToggle />

          <div className={mobileMenu()}>
            <Sheet onOpenChange={setIsMobileOpen} open={isMobileOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label="Open navigation"
                  className={iconButton()}
                  type="button"
                >
                  <Menu className="h-4 w-4" />
                </button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className={mobilePanel()}>
                  {navItems.map((item) => (
                    <Link
                      className={mobileLink()}
                      key={item.path}
                      onClick={closeOverlays}
                      to={item.path}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    className={mobileLink()}
                    onClick={closeOverlays}
                    to="/profile"
                  >
                    Profile
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {isCartOpen && location.pathname !== "/checkout" ? (
            <CartDropdown onNavigate={closeOverlays} />
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
