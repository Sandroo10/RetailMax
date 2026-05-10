import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCartContext } from "@/hooks/useCartContext";
import { getLocalizedProductName } from "@/lib/product-localization";
import { Button } from "@/components/ui/button";

interface CartDropdownProps {
  onNavigate: () => void;
}

const CartDropdown = ({ onNavigate }: CartDropdownProps) => {
  const { i18n, t } = useTranslation();
  const {
    addItemToCart,
    cartItems,
    clearItemsFromCart,
    removeItemFromCart,
    totalValue,
  } = useCartContext();
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
                className="grid grid-cols-[56px_1fr] gap-2 rounded-lg border border-border/80 bg-surface-2 p-2 shadow-soft"
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
                  <p className="mt-1 text-sm font-bold text-foreground">
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="inline-flex items-center rounded-pill border border-border/80 bg-surface-1 p-0.5">
                      <button
                        aria-label={t("checkout.decreaseQuantityAria", {
                          name: localizedName,
                        })}
                        className="inline-flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition hover:text-foreground"
                        onClick={() => removeItemFromCart(item)}
                        type="button"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        aria-label={t("checkout.increaseQuantityAria", {
                          name: localizedName,
                        })}
                        className="inline-flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition hover:text-foreground"
                        onClick={() => addItemToCart(item)}
                        type="button"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      aria-label={t("checkout.removeItemAria", {
                        name: localizedName,
                      })}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-surface-1 text-muted-foreground transition hover:border-danger/60 hover:text-danger"
                      onClick={() => clearItemsFromCart(item)}
                      type="button"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </div>
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
        <Button
          asChild
          className="w-full"
          onClick={onNavigate}
          variant="secondary"
        >
          <Link to="/shop">{t("product.continueShopping")}</Link>
        </Button>
      </div>
    </aside>
  );
};

export default CartDropdown;
