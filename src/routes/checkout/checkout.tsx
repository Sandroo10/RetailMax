import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/Cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button.component/Button";

interface PaymentDetails {
  name: string;
  address: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const CheckoutPage = () => {
  const { t } = useTranslation(); // Add translation hook
  const { cartItems, totalValue, emptyCart } = useContext(CartContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentDetails>();

  const onSubmit = (data: PaymentDetails) => {
    console.log("Payment Details:", data);
    alert(t("checkout.paymentSuccessful")); // Use translation here

    // Clear the entire cart after payment
    emptyCart();

    // Redirect to the main screen
    navigate("/");
  };

  return (
    <div className="w-[55%] min-h-[90vh] flex flex-col items-center mt-12 mx-auto">
      <div className="w-full py-2 sm:flex justify-between border-b border-gray-400 hidden">
        <div className="capitalize w-[23%]">{t("checkout.product")}</div>
        <div className="capitalize w-[23%]">{t("checkout.description")}</div>
        <div className="capitalize w-[23%]">{t("checkout.quantity")}</div>
        <div className="capitalize w-[23%]">{t("checkout.price")}</div>
        <div className="capitalize w-[8%]">{t("checkout.remove")}</div>
      </div>
      {cartItems.map((item) => (
        <CheckoutItem key={item.id} item={item} />
      ))}
      <span className="mt-8 ml-auto text-3xl">
        {t("checkout.total")}: ${totalValue}
      </span>

      {cartItems.length > 0 && (
        <form
          className="w-full mt-8 p-6 border border-gray-300 rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-2xl mb-4">{t("checkout.paymentDetails")}</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              {t("checkout.name")}
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: t("checkout.nameRequired") })}
              className="w-full border px-3 py-2 rounded-md"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="address">
              {t("checkout.address")}
            </label>
            <input
              id="address"
              type="text"
              {...register("address", {
                required: t("checkout.addressRequired"),
              })}
              className="w-full border px-3 py-2 rounded-md"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="cardNumber"
            >
              {t("checkout.cardNumber")}
            </label>
            <input
              id="cardNumber"
              type="text"
              {...register("cardNumber", {
                required: t("checkout.cardNumberRequired"),
                pattern: {
                  value: /^[0-9]{16}$/,
                  message: t("checkout.cardNumberPattern"),
                },
              })}
              className="w-full border px-3 py-2 rounded-md"
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm">
                {errors.cardNumber.message}
              </p>
            )}
          </div>
          <div className="mb-4 flex space-x-4">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="expiryDate"
              >
                {t("checkout.expiryDate")}
              </label>
              <input
                id="expiryDate"
                type="text"
                placeholder="MM/YY"
                {...register("expiryDate", {
                  required: t("checkout.expiryDateRequired"),
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                    message: t("checkout.expiryDatePattern"),
                  },
                })}
                className="w-full border px-3 py-2 rounded-md"
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-sm">
                  {errors.expiryDate.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="cvv">
                {t("checkout.cvv")}
              </label>
              <input
                id="cvv"
                type="text"
                {...register("cvv", {
                  required: t("checkout.cvvRequired"),
                  pattern: {
                    value: /^[0-9]{3,4}$/,
                    message: t("checkout.cvvPattern"),
                  },
                })}
                className="w-full border px-3 py-2 rounded-md"
              />
              {errors.cvv && (
                <p className="text-red-500 text-sm">{errors.cvv.message}</p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-500 dark:bg-orange-700 text-white py-2 rounded-md hover:bg-blue-600"
          >
            {t("checkout.payNow")}
          </Button>
        </form>
      )}
    </div>
  );
};

export default CheckoutPage;
