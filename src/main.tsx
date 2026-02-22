import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "@/App";
import { CartProvider } from "@/contexts/Cart.context";
import { UserProvider } from "@/contexts/User.Context";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ToastProvider } from "@/components/ui/toast";
import "@/index.css";
import "@/i18n";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserProvider>
          <CartProvider>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
              <ToastProvider>
                <App />
              </ToastProvider>
            </ThemeProvider>
          </CartProvider>
        </UserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
