import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { useCartContext } from "@/hooks/useCartContext";
import CheckoutItemRow from "./sections/CheckoutItemRow";

const createCheckoutSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(1, t("checkout.nameRequired")),
    address: z.string().min(1, t("checkout.addressRequired")),
    cardNumber: z.string().regex(/^\d{16}$/, t("checkout.cardNumberPattern")),
    expiryDate: z
      .string()
      .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, t("checkout.expiryDatePattern")),
    cvv: z.string().regex(/^\d{3,4}$/, t("checkout.cvvPattern")),
  });

type CheckoutFormValues = z.infer<ReturnType<typeof createCheckoutSchema>>;

const fieldLabelClass = "text-sm font-semibold text-foreground";

const CheckoutDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pushToast } = useToast();
  const { cartItems, emptyCart, totalValue } = useCartContext();
  const checkoutSchema = createCheckoutSchema(t);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      address: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const onSubmit = async () => {
    emptyCart();
    pushToast({
      title: t("checkout.orderPlacedTitle"),
      description: t("checkout.orderPlacedDescription"),
      variant: "success",
    });
    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
      <section className="rounded-lg border border-border bg-surface-1 p-8 text-center shadow-soft">
        <p className="text-xl font-bold text-foreground">{t("checkout.cartEmptyTitle")}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("checkout.cartEmptyDescription")}
        </p>
        <Button asChild className="mt-4" variant="primary">
          <Link to="/shop">{t("checkout.browseProducts")}</Link>
        </Button>
      </section>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <section className="rounded-lg border border-border bg-surface-1 p-5 shadow-soft">
          <h2 className="text-lg font-bold text-foreground">{t("checkout.shippingDetailsTitle")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("checkout.shippingDetailsDescription")}
          </p>

          <div className="mt-4 grid gap-3">
            <div className="grid gap-1.5">
              <label className={fieldLabelClass} htmlFor="checkout-name">
                {t("checkout.name")}
              </label>
              <Input
                aria-label={t("checkout.name")}
                id="checkout-name"
                placeholder={t("checkout.namePlaceholder")}
                {...register("name")}
              />
              {errors.name ? <p className="text-xs text-danger">{errors.name.message}</p> : null}
            </div>

            <div className="grid gap-1.5">
              <label className={fieldLabelClass} htmlFor="checkout-address">
                {t("checkout.address")}
              </label>
              <Input
                aria-label={t("checkout.address")}
                id="checkout-address"
                placeholder={t("checkout.addressPlaceholder")}
                {...register("address")}
              />
              {errors.address ? <p className="text-xs text-danger">{errors.address.message}</p> : null}
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-surface-1 p-5 shadow-soft">
          <h2 className="text-lg font-bold text-foreground">{t("checkout.paymentDetails")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("checkout.paymentDetailsDescription")}
          </p>

          <div className="mt-4 grid gap-3">
            <div className="grid gap-1.5">
              <label className={fieldLabelClass} htmlFor="checkout-card-number">
                {t("checkout.cardNumber")}
              </label>
              <Input
                aria-label={t("checkout.cardNumber")}
                id="checkout-card-number"
                inputMode="numeric"
                placeholder={t("checkout.cardNumberPlaceholder")}
                {...register("cardNumber")}
              />
              {errors.cardNumber ? (
                <p className="text-xs text-danger">{errors.cardNumber.message}</p>
              ) : null}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <label className={fieldLabelClass} htmlFor="checkout-expiry-date">
                  {t("checkout.expiryDate")}
                </label>
                <Input
                  aria-label={t("checkout.expiryDate")}
                  id="checkout-expiry-date"
                  placeholder={t("checkout.expiryDatePlaceholder")}
                  {...register("expiryDate")}
                />
                {errors.expiryDate ? (
                  <p className="text-xs text-danger">{errors.expiryDate.message}</p>
                ) : null}
              </div>

              <div className="grid gap-1.5">
                <label className={fieldLabelClass} htmlFor="checkout-cvv">
                  {t("checkout.cvv")}
                </label>
                <Input
                  aria-label={t("checkout.cvv")}
                  id="checkout-cvv"
                  inputMode="numeric"
                  placeholder={t("checkout.cvvPlaceholder")}
                  {...register("cvv")}
                />
                {errors.cvv ? <p className="text-xs text-danger">{errors.cvv.message}</p> : null}
              </div>
            </div>
          </div>
        </section>
        <button className="sr-only" type="submit">
          {t("checkout.submitOrder")}
        </button>
      </form>

      <aside className="space-y-4 lg:sticky lg:top-24">
        <section className="rounded-lg border border-border bg-surface-1 p-5 shadow-soft">
          <h2 className="text-lg font-bold text-foreground">{t("checkout.orderSummary")}</h2>
          <div className="mt-4 space-y-3">
            {cartItems.map((item) => (
              <CheckoutItemRow item={item} key={item.id} />
            ))}
          </div>

          <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>{t("checkout.subtotal")}</span>
              <span className="font-semibold text-foreground">${totalValue.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>{t("checkout.shipping")}</span>
              <span className="font-semibold text-foreground">{t("checkout.free")}</span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-2 text-base font-bold text-foreground">
              <span>{t("checkout.totalLabel")}</span>
              <span>${totalValue.toFixed(2)}</span>
            </div>
          </div>

          <Button
            aria-label={t("checkout.submitPaymentAria")}
            className="mt-4 w-full"
            isLoading={isSubmitting}
            loadingText={t("checkout.processing")}
            onClick={handleSubmit(onSubmit)}
            size="lg"
            type="button"
            variant="primary"
          >
            {t("checkout.payNow")}
          </Button>
        </section>
      </aside>
    </div>
  );
};

export default CheckoutDetail;
