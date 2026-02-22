import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCartContext } from "@/hooks/useCartContext";
import { getLocalizedProductName } from "@/lib/product-localization";
import { Button } from "@/components/ui/button";

interface CartDropdownProps {
  onNavigate: () => void;
}

const CartDropdown = ({ onNavigate }: CartDropdownProps) => {
  const { i18n, t } = useTranslation();
  const { cartItems, totalValue } = useCartContext();
  const language = i18n.resolvedLanguage ?? i18n.language;

  return (
    <aside className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand/15 text-brand">
          <ShoppingBag className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {t("header.cartTitle")}
          </p>
          <p className="text-xs text-muted-foreground">
            {t("header.cartItemsCount", { count: cartItems.length })}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-1 flex-col gap-3 overflow-y-auto pr-1">
        {cartItems.length === 0 ? (
          <p className="rounded-md border border-border bg-surface-2 p-4 text-sm text-muted-foreground">
            {t("header.cartEmpty")}
          </p>
        ) : (
          cartItems.map((item) => {
            const localizedName = getLocalizedProductName(item, language);

            return (
              <article
                className="grid grid-cols-[56px_1fr_auto] items-center gap-2 rounded-md border border-border bg-surface-2 p-2"
                key={item.id}
              >
                <img
                  alt={localizedName}
                  className="h-14 w-14 rounded-md object-cover"
                  loading="lazy"
                  src={item.image_url}
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {localizedName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("header.cartLine", {
                      quantity: item.quantity,
                      price: item.price,
                    })}
                  </p>
                </div>
                <p className="text-sm font-semibold text-foreground">
                  ${(item.quantity * item.price).toFixed(2)}
                </p>
              </article>
            );
          })
        )}
      </div>

      <div className="mt-4 space-y-3 border-t border-border pt-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{t("header.subtotal")}</span>
          <span className="font-bold text-foreground">
            {t("header.cartTotal", { total: totalValue.toFixed(2) })}
          </span>
        </div>

        <Button
          asChild
          className="w-full"
          onClick={onNavigate}
          variant="primary"
        >
          <Link aria-label={t("header.goToCheckoutAria")} to="/checkout">
            {t("navigation.checkout")}
          </Link>
        </Button>
      </div>
    </aside>
  );
};

export default CartDropdown;
