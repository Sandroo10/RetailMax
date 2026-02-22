import { Minus, Plus, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { CartItem } from "@/contexts/types";
import { useCartContext } from "@/hooks/useCartContext";
import {
  getLocalizedProductDescription,
  getLocalizedProductName,
} from "@/lib/product-localization";

interface CheckoutItemRowProps {
  item: CartItem;
}

const CheckoutItemRow = ({ item }: CheckoutItemRowProps) => {
  const { i18n, t } = useTranslation();
  const { addItemToCart, clearItemsFromCart, removeItemFromCart } =
    useCartContext();
  const language = i18n.resolvedLanguage ?? i18n.language;
  const localizedName = getLocalizedProductName(item, language);
  const localizedDescription = getLocalizedProductDescription(item, language);

  return (
    <article className="grid items-center gap-3 rounded-md border border-border bg-surface-1 p-3 sm:grid-cols-[76px_1fr_auto]">
      <img
        alt={localizedName}
        className="h-[72px] w-[72px] rounded-md object-cover"
        loading="lazy"
        src={item.image_url}
      />

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground">
          {localizedName}
        </p>
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {localizedDescription}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="inline-flex items-center rounded-pill border border-border bg-surface-2 p-1">
          <button
            aria-label={t("checkout.decreaseQuantityAria", {
              name: localizedName,
            })}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition hover:text-foreground"
            onClick={() => removeItemFromCart(item)}
            type="button"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-6 text-center text-sm font-semibold text-foreground">
            {item.quantity}
          </span>
          <button
            aria-label={t("checkout.increaseQuantityAria", {
              name: localizedName,
            })}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition hover:text-foreground"
            onClick={() => addItemToCart(item)}
            type="button"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        <button
          aria-label={t("checkout.removeItemAria", { name: localizedName })}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface-2 text-muted-foreground transition hover:border-danger/60 hover:text-danger"
          onClick={() => clearItemsFromCart(item)}
          type="button"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <span className="min-w-20 text-right text-sm font-bold text-foreground">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </article>
  );
};

export default CheckoutItemRow;
