import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

const checkoutSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const CheckoutDetail = () => {
  const navigate = useNavigate();
  const { cartItems, emptyCart, totalValue } = useCartContext();

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
        <h2 className={sectionTitle()}>Your cart</h2>
        {cartItems.length === 0 ? (
          <p className={emptyState()}>Cart is empty.</p>
        ) : (
          cartItems.map((item) => <CheckoutItemRow item={item} key={item.id} />)
        )}
        <p className={total()}>Total: ${totalValue.toFixed(2)}</p>
      </section>

      <section className={formSection()}>
        <h2 className={sectionTitle()}>Payment details</h2>
        <form className={form()} onSubmit={handleSubmit(onSubmit)}>
          <div className={fieldGroup()}>
            <label className={label()} htmlFor="checkout-name">
              Name
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
              Address
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
              Card number
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
                Expiry date
              </label>
              <input
                className={input()}
                id="checkout-expiry-date"
                placeholder="MM/YY"
                {...register("expiryDate")}
              />
              {errors.expiryDate ? (
                <p className={errorText()}>{errors.expiryDate.message}</p>
              ) : null}
            </div>

            <div className={fieldGroup()}>
              <label className={label()} htmlFor="checkout-cvv">
                CVV
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
            aria-label="Submit payment"
            className={submitButton()}
            type="submit"
          >
            {isSubmitting ? "Processing..." : "Pay now"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default CheckoutDetail;
