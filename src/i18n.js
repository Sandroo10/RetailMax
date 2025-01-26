import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        navigation: {
          profile: "Profile",
          shop: "Shop",
          signIn: "Sign In",
          signOut: "Sign Out",
          checkout: "Checkout",
          home: "Home",
          navigation: "Navigation",
        },
        checkout: {
          paymentDetails: "Payment Details",
          name: "Name",
          address: "Address",
          cardNumber: "Card Number",
          expiryDate: "Expiry Date",
          cvv: "CVV",
          total: "Total:",
          payNow: "Pay Now",
          paymentSuccessful: "Payment Successful!",
          nameRequired: "Name is required",
          addressRequired: "Address is required",
          cardNumberRequired: "Card number is required",
          cardNumberPattern: "Card number must be 16 digits",
          expiryDateRequired: "Expiry date is required",
          expiryDatePattern: "Invalid expiry date format (MM/YY)",
          cvvRequired: "CVV is required",
          cvvPattern: "CVV must be 3 or 4 digits",
        },
        categories: {
          clothing: "Clothing",
          electronics: "Electronics",
          gymEquipment: "Gym Equipment",
          toys: "Toys",
          beautyProducts: "Beauty Products",
        },
        directory: {
          welcomeMessage:
            "Welcome to our store! Discover a wide range of products, from clothing and electronics to beauty essentials and toys. Enjoy your shopping journey!",
        },
      },
    },
    ka: {
      translation: {
        navigation: {
          profile: "პროფილი",
          shop: "მაღაზია",
          signIn: "შესვლა",
          signOut: "გამოსვლა",
          checkout: "გადახდა",
          home: "მთავარი",
          navigation: "ნავიგაცია",
        },
        checkout: {
          paymentDetails: "გადახდის დეტალები",
          name: "სახელი",
          address: "მისამართი",
          cardNumber: "ბარათის ნომერი",
          expiryDate: "მოახლოვების თარიღი",
          cvv: "CVV",
          total: "ჯამი:",
          payNow: "გადაიხადეთ ახლა",
          paymentSuccessful: "გადახდა წარმატებით!",
          nameRequired: "სახელი არის აუცილებელი",
          addressRequired: "მისამართი აუცილებელია",
          cardNumberRequired: "ბარათის ნომერი აუცილებელია",
          cardNumberPattern: "ბარათის ნომერი უნდა იყოს 16 ციფრი",
          expiryDateRequired: "მოახლოვების თარიღი აუცილებელია",
          expiryDatePattern: "არასწორი ფორმატი (MM/YY)",
          cvvRequired: "CVV აუცილებელია",
          cvvPattern: "CVV უნდა იყოს 3 ან 4 ციფრი",
        },
        categories: {
          clothing: "ტანსაცმელი",
          electronics: "ელექტრონიკა",
          gymEquipment: "სპორტული აღჭურვილობა",
          toys: "სათამაშოები",
          beautyProducts: "სილამაზის პროდუქტები",
        },
        directory: {
          welcomeMessage:
            "კეთილი იყოს თქვენი მობრძანება ჩვენს მაღაზიაში! აღმოაჩინეთ პროდუქტების ფართო არჩევანი ტანსაცმელიდან და ელექტრონიკიდან სილამაზის ნივთებამდე და სათამაშოებამდე. ისიამოვნეთ საყიდლებით!",
        },
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
