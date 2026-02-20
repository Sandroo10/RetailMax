import { Menu, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
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
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import {
  actionGroup,
  brandImage,
  brandLink,
  cartButton,
  cartBadge,
  container,
  desktopAction,
  desktopControl,
  iconButton,
  mobileButton,
  mobileLink,
  mobileMenu,
  mobilePanel,
  mobileUtilityItem,
  mobileUtilityRow,
  nav,
  navLink,
  shell,
} from "./Header.styles";

const navItems = [
  { path: "/", key: "navigation.home" },
  { path: "/shop", key: "navigation.shop" },
  { path: "/checkout", key: "navigation.checkout" },
];

const Header = () => {
  const { t } = useTranslation();
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
        <Link aria-label={t("header.brandAria")} className={brandLink()} to="/">
          <img
            alt={t("header.brandLogoAlt")}
            className={brandImage()}
            src={siteLogo}
          />
        </Link>

        <nav className={nav()}>
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) => navLink({ active: isActive })}
              key={item.path}
              to={item.path}
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        <div className={actionGroup()}>
          {currentUser ? (
            <Link
              aria-label={t("header.goToProfileAria")}
              className={desktopAction()}
              to="/profile"
            >
              <img
                alt={t("header.profileImageAlt")}
                className="h-6 w-6 rounded-full object-cover"
                src={profileImage}
              />
            </Link>
          ) : (
            <Link
              aria-label={t("header.openAuthAria")}
              className={desktopAction()}
              to="/auth"
            >
              {t("navigation.signIn")}
            </Link>
          )}

          {currentUser && (
            <button
              aria-label={t("header.signOutAria")}
              className={desktopAction()}
              onClick={() => signOut()}
              type="button"
            >
              {t("navigation.signOut")}
            </button>
          )}

          <button
            aria-label={t("header.toggleCartAria")}
            className={cartButton()}
            onClick={toggleCart}
            type="button"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className={cartBadge()}>{totalQuantity}</span>
          </button>

          <div className={desktopControl()}>
            <LanguageToggle />
          </div>
          <div className={desktopControl()}>
            <ThemeToggle />
          </div>

          <div className={mobileMenu()}>
            <Sheet onOpenChange={setIsMobileOpen} open={isMobileOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label={t("header.openNavigationAria")}
                  className={iconButton()}
                  type="button"
                >
                  <Menu className="h-4 w-4" />
                </button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>{t("header.menu")}</SheetTitle>
                </SheetHeader>
                <div className={mobilePanel()}>
                  {navItems.map((item) => (
                    <Link
                      className={mobileLink()}
                      key={item.path}
                      onClick={closeOverlays}
                      to={item.path}
                    >
                      {t(item.key)}
                    </Link>
                  ))}
                  {currentUser ? (
                    <>
                      <Link
                        aria-label={t("header.goToProfileAria")}
                        className={mobileLink()}
                        onClick={closeOverlays}
                        to="/profile"
                      >
                        {t("navigation.profile")}
                      </Link>
                      <button
                        aria-label={t("header.signOutAria")}
                        className={mobileButton()}
                        onClick={() => {
                          signOut();
                          closeOverlays();
                        }}
                        type="button"
                      >
                        {t("navigation.signOut")}
                      </button>
                    </>
                  ) : (
                    <Link
                      aria-label={t("header.openAuthAria")}
                      className={mobileLink()}
                      onClick={closeOverlays}
                      to="/auth"
                    >
                      {t("navigation.signIn")}
                    </Link>
                  )}
                  <div className={mobileUtilityRow()}>
                    <div className={mobileUtilityItem()}>
                      <LanguageToggle />
                    </div>
                    <div className={mobileUtilityItem()}>
                      <ThemeToggle />
                    </div>
                  </div>
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
