import { LogOut, Menu, ShoppingBag, UserCircle2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { defaultProfileImage, siteLogo } from "@/assets";
import Container from "@/components/layout/Container";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSignOutMutation } from "@/hooks/useAuthMutations";
import { useCartContext } from "@/hooks/useCartContext";
import { useUserContext } from "@/hooks/useUserContext";
import CartDropdown from "./CartDropdown";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { path: "/", key: "navigation.home" },
  { path: "/shop", key: "navigation.shop" },
  { path: "/checkout", key: "navigation.checkout" },
];

const Header = () => {
  const { t } = useTranslation();
  const { currentUser, profilePicture } = useUserContext();
  const { mutate: signOut } = useSignOutMutation();
  const { isCartOpen, setIsCartOpen, totalQuantity } = useCartContext();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const profileImage = useMemo(
    () => profilePicture || defaultProfileImage,
    [profilePicture],
  );

  const closeOverlays = () => {
    setIsMobileOpen(false);
    setIsCartOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/88 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-3">
        <Link
          aria-label={t("header.brandAria")}
          className="inline-flex items-center gap-2.5"
          to="/"
        >
          <img
            alt={t("header.brandLogoAlt")}
            className="h-10 w-fit rounded-md object-cover"
            src={siteLogo}
          />
        </Link>

        <nav className="hidden items-center gap-1 rounded-pill border border-border bg-surface-1 p-1 shadow-soft lg:flex">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                [
                  "rounded-pill px-4 py-2 text-sm font-semibold transition duration-180",
                  isActive
                    ? "bg-brand text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
                ].join(" ")
              }
              end={item.path === "/"}
              key={item.path}
              to={item.path}
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>

          <ThemeToggle />

          <Drawer onOpenChange={setIsCartOpen} open={isCartOpen}>
            <DrawerTrigger asChild>
              <button
                aria-label={t("header.toggleCartAria")}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-1 text-foreground shadow-soft transition duration-180 hover:border-brand/50"
                type="button"
              >
                <ShoppingBag className="h-4 w-4" />
                <span className="absolute -right-1 -top-1 min-w-5 rounded-pill bg-brand px-1.5 text-[11px] font-bold text-primary-foreground">
                  {totalQuantity}
                </span>
              </button>
            </DrawerTrigger>
            <DrawerContent side="right">
              <DrawerHeader>
                <DrawerTitle>{t("navigation.checkout")}</DrawerTitle>
              </DrawerHeader>
              <CartDropdown onNavigate={closeOverlays} />
            </DrawerContent>
          </Drawer>

          <div className="hidden lg:block">
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    aria-label={t("header.goToProfileAria")}
                    className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border bg-surface-1 shadow-soft transition duration-180 hover:border-brand/50"
                    type="button"
                  >
                    <img
                      alt={t("header.profileImageAlt")}
                      className="h-full w-full object-cover"
                      src={profileImage}
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <UserCircle2 className="h-4 w-4" />
                      {t("navigation.profile")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="h-4 w-4" />
                    {t("navigation.signOut")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                aria-label={t("header.openAuthAria")}
                className="inline-flex h-10 items-center justify-center rounded-pill border border-border bg-surface-1 px-4 text-sm font-semibold text-foreground shadow-soft transition duration-180 hover:border-brand/50"
                to="/auth"
              >
                {t("navigation.signIn")}
              </Link>
            )}
          </div>

          <div className="lg:hidden">
            <Drawer onOpenChange={setIsMobileOpen} open={isMobileOpen}>
              <DrawerTrigger asChild>
                <button
                  aria-label={t("header.openNavigationAria")}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-1 text-foreground shadow-soft transition duration-180 hover:border-brand/50"
                  type="button"
                >
                  <Menu className="h-4 w-4" />
                </button>
              </DrawerTrigger>
              <DrawerContent side="left">
                <DrawerHeader>
                  <DrawerTitle>{t("header.menu")}</DrawerTitle>
                </DrawerHeader>

                <div className="mt-2 grid gap-2">
                  {navItems.map((item) => (
                    <Link
                      className="rounded-md border border-border bg-surface-2 px-3 py-2 text-sm font-semibold text-foreground"
                      key={item.path}
                      onClick={closeOverlays}
                      to={item.path}
                    >
                      {t(item.key)}
                    </Link>
                  ))}
                </div>

                <div className="mt-4 grid gap-2 border-t border-border pt-4">
                  {currentUser ? (
                    <>
                      <Link
                        className="rounded-md border border-border bg-surface-2 px-3 py-2 text-sm font-semibold text-foreground"
                        onClick={closeOverlays}
                        to="/profile"
                      >
                        {t("navigation.profile")}
                      </Link>
                      <button
                        className="rounded-md border border-border bg-surface-2 px-3 py-2 text-left text-sm font-semibold text-foreground"
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
                      className="rounded-md border border-border bg-surface-2 px-3 py-2 text-sm font-semibold text-foreground"
                      onClick={closeOverlays}
                      to="/auth"
                    >
                      {t("navigation.signIn")}
                    </Link>
                  )}

                  <div className="flex items-center gap-2">
                    <LanguageToggle />
                    <ThemeToggle />
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
