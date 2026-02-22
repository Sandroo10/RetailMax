import { Facebook, Instagram, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="mt-16 border-t border-border bg-surface-1">
      <Container className="grid gap-8 py-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <div>
            <p className="text-2xl font-bold text-foreground">RetailMax</p>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              {t("footer.tagline")}
            </p>
          </div>

          <form
            className="max-w-sm space-y-2"
            onSubmit={(event) => event.preventDefault()}
          >
            <label
              className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
              htmlFor="newsletter-email"
            >
              {t("footer.newsletter")}
            </label>
            <div className="flex gap-2">
              <Input
                aria-label={t("footer.newsletterAria")}
                id="newsletter-email"
                placeholder={t("footer.newsletterPlaceholder")}
                type="email"
              />
              <Button
                aria-label={t("footer.newsletterSubmitAria")}
                size="icon"
                type="submit"
                variant="primary"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-foreground">
            {t("footer.shopTitle")}
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link
                className="transition hover:text-brand"
                to="/shop/electronics"
              >
                {t("categories.electronics")}
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-brand" to="/shop/clothing">
                {t("categories.clothing")}
              </Link>
            </li>
            <li>
              <Link
                className="transition hover:text-brand"
                to="/shop/gym-equipment"
              >
                {t("categories.gymEquipment")}
              </Link>
            </li>
            <li>
              <Link
                className="transition hover:text-brand"
                to="/shop/beauty-products"
              >
                {t("categories.beautyProducts")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-foreground">
            {t("footer.companyTitle")}
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link className="transition hover:text-brand" to="/">
                {t("footer.companyAbout")}
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-brand" to="/profile">
                {t("footer.companyAccount")}
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-brand" to="/auth">
                {t("footer.companyCareers")}
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-brand" to="/shop">
                {t("footer.companyPress")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-foreground">
            {t("footer.supportTitle")}
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link
                className="transition hover:text-brand"
                to="/support/shipping"
              >
                {t("footer.supportShipping")}
              </Link>
            </li>
            <li>
              <Link
                className="transition hover:text-brand"
                to="/support/returns"
              >
                {t("footer.supportReturns")}
              </Link>
            </li>
            <li>
              <Link
                className="transition hover:text-brand"
                to="/support/secure-payments"
              >
                {t("footer.supportSecurePayments")}
              </Link>
            </li>
          </ul>

          <div className="mt-4 flex items-center gap-2">
            <a
              aria-label={t("footer.facebookAria")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-2 text-muted-foreground transition hover:border-brand hover:text-brand"
              href="https://facebook.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              aria-label={t("footer.instagramAria")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-2 text-muted-foreground transition hover:border-brand hover:text-brand"
              href="https://instagram.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Container>

      <Container className="border-t border-border py-3 text-center text-xs text-muted-foreground">
        {new Date().getFullYear()} RetailMax. {t("footer.copyright")}
      </Container>
    </footer>
  );
};

export default Footer;
