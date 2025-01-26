const translations = {
    en: {
      navigation: {
        profile: "Profile",
        shop: "Shop",
        signIn: "Sign In",
        signOut: "Sign Out",
        checkout: "Checkout",
        home: "Home",
      },
      checkout: {
        total: "Total",
        paymentDetails: "Payment Details",
        name: "Name",
        address: "Address",
        cardNumber: "Card Number",
        expiryDate: "Expiry Date",
        cvv: "CVV",
        payNow: "Pay Now",
        errors: {
          nameRequired: "Name is required",
          addressRequired: "Address is required",
          cardNumberRequired: "Card number is required",
          cardNumberInvalid: "Card number must be 16 digits",
          expiryDateRequired: "Expiry date is required",
          expiryDateInvalid: "Invalid expiry date format (MM/YY)",
          cvvRequired: "CVV is required",
          cvvInvalid: "CVV must be 3 or 4 digits",
        },
      },
    },
    ka: {
      navigation: {
        profile: "პროფილი",
        shop: "მაღაზია",
        signIn: "შესვლა",
        signOut: "გასვლა",
        checkout: "გადახდა",
        home: "მთავარი",
      },
      checkout: {
        total: "ჯამი",
        paymentDetails: "გადახდის დეტალები",
        name: "სახელი",
        address: "მისამართი",
        cardNumber: "ბარათის ნომერი",
        expiryDate: "ვადა",
        cvv: "CVV",
        payNow: "გადახდა",
        errors: {
          nameRequired: "სახელი აუცილებელია",
          addressRequired: "მისამართი აუცილებელია",
          cardNumberRequired: "ბარათის ნომერი აუცილებელია",
          cardNumberInvalid: "ბარათის ნომერი უნდა იყოს 16 ციფრი",
          expiryDateRequired: "ვადა აუცილებელია",
          expiryDateInvalid: "არასწორი ვადის ფორმატი (თვე/წელი)",
          cvvRequired: "CVV აუცილებელია",
          cvvInvalid: "CVV უნდა იყოს 3 ან 4 ციფრი",
        },
      },
    },
  };
  
  export default translations;
  