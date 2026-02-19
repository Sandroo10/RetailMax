import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "@/hooks/useCartContext";
import CheckoutItemRow from "./sections/CheckoutItemRow";
import {
  cartSection,
  container,
  emptyState,
  errorText,
  fieldGroup,
  form,
  formSection,
  input,
  label,
  sectionTitle,
  submitButton,
  total,
} from "./CheckoutDetail.styles";

const createCheckoutSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(1, t("checkout.nameRequired")),
    address: z.string().min(1, t("checkout.addressRequired")),
    cardNumber: z
      .string()
      .regex(/^\d{16}$/, t("checkout.cardNumberPattern")),
    expiryDate: z
      .string()
      .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, t("checkout.expiryDatePattern")),
    cvv: z.string().regex(/^\d{3,4}$/, t("checkout.cvvPattern")),
  });

type CheckoutFormValues = z.infer<ReturnType<typeof createCheckoutSchema>>;

const CheckoutDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
    navigate("/");
  };

  return (
    <div className={container()}>
      <section className={cartSection()}>
        <h2 className={sectionTitle()}>{t("checkout.yourCart")}</h2>
        {cartItems.length === 0 ? (
          <p className={emptyState()}>{t("checkout.cartEmpty")}</p>
        ) : (
          cartItems.map((item) => <CheckoutItemRow item={item} key={item.id} />)
        )}
        <p className={total()}>
          {t("checkout.total", { total: totalValue.toFixed(2) })}
        </p>
      </section>

      <section className={formSection()}>
        <h2 className={sectionTitle()}>{t("checkout.paymentDetails")}</h2>
        <form className={form()} onSubmit={handleSubmit(onSubmit)}>
          <div className={fieldGroup()}>
            <label className={label()} htmlFor="checkout-name">
              {t("checkout.name")}
            </label>
            <input
              className={input()}
              id="checkout-name"
              {...register("name")}
            />
            {errors.name ? (
              <p className={errorText()}>{errors.name.message}</p>
            ) : null}
          </div>

          <div className={fieldGroup()}>
            <label className={label()} htmlFor="checkout-address">
              {t("checkout.address")}
            </label>
            <input
              className={input()}
              id="checkout-address"
              {...register("address")}
            />
            {errors.address ? (
              <p className={errorText()}>{errors.address.message}</p>
            ) : null}
          </div>

          <div className={fieldGroup()}>
            <label className={label()} htmlFor="checkout-card-number">
              {t("checkout.cardNumber")}
            </label>
            <input
              className={input()}
              id="checkout-card-number"
              {...register("cardNumber")}
            />
            {errors.cardNumber ? (
              <p className={errorText()}>{errors.cardNumber.message}</p>
            ) : null}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className={fieldGroup()}>
              <label className={label()} htmlFor="checkout-expiry-date">
                {t("checkout.expiryDate")}
              </label>
              <input
                className={input()}
                id="checkout-expiry-date"
                placeholder={t("checkout.expiryDatePlaceholder")}
                {...register("expiryDate")}
              />
              {errors.expiryDate ? (
                <p className={errorText()}>{errors.expiryDate.message}</p>
              ) : null}
            </div>

            <div className={fieldGroup()}>
              <label className={label()} htmlFor="checkout-cvv">
                {t("checkout.cvv")}
              </label>
              <input
                className={input()}
                id="checkout-cvv"
                {...register("cvv")}
              />
              {errors.cvv ? (
                <p className={errorText()}>{errors.cvv.message}</p>
              ) : null}
            </div>
          </div>

          <button
            aria-label={t("checkout.submitPaymentAria")}
            className={submitButton()}
            type="submit"
          >
            {isSubmitting ? t("checkout.processing") : t("checkout.payNow")}
          </button>
        </form>
      </section>
    </div>
  );
};

export default CheckoutDetail;
