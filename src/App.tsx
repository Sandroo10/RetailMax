import { lazy, Suspense, type ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingFallback from "@/components/ui/loading-fallback/LoadingFallback";
import { useAuthSession } from "@/hooks/useAuthSession";
import AppLayout from "@/layouts/AppLayout";

const HomePage = lazy(() => import("@/pages/HomePage"));
const ShopPage = lazy(() => import("@/pages/ShopPage"));
const ShopCategoryPage = lazy(() => import("@/pages/ShopCategoryPage"));
const ProductPage = lazy(() => import("@/pages/ProductPage"));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const AuthPage = lazy(() => import("@/pages/AuthPage"));
const SupportShippingPage = lazy(() => import("@/pages/SupportShippingPage"));
const SupportReturnsPage = lazy(() => import("@/pages/SupportReturnsPage"));
const SupportSecurePaymentsPage = lazy(
  () => import("@/pages/SupportSecurePaymentsPage"),
);
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const withSuspense = (element: ReactNode) => (
  <Suspense fallback={<LoadingFallback />}>{element}</Suspense>
);

const App = () => {
  useAuthSession();

  return (
    <Routes>
      <Route element={<AppLayout />} path="/">
        <Route element={withSuspense(<HomePage />)} index />
        <Route element={withSuspense(<ShopPage />)} path="shop" />
        <Route
          element={withSuspense(<ShopCategoryPage />)}
          path="shop/:category"
        />
        <Route element={withSuspense(<ProductPage />)} path="product/:id" />
        <Route element={withSuspense(<CheckoutPage />)} path="checkout" />
        <Route element={withSuspense(<ProfilePage />)} path="profile" />
        <Route element={withSuspense(<AuthPage />)} path="auth" />
        <Route
          element={withSuspense(<SupportShippingPage />)}
          path="support/shipping"
        />
        <Route
          element={withSuspense(<SupportReturnsPage />)}
          path="support/returns"
        />
        <Route
          element={withSuspense(<SupportSecurePaymentsPage />)}
          path="support/secure-payments"
        />
        <Route element={withSuspense(<NotFoundPage />)} path="*" />
      </Route>
    </Routes>
  );
};

export default App;
