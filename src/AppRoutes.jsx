import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import ShoppingCartCheckout from "./pages/shopping-cart-checkout";
import LoginRegistration from "./pages/login-registration";
import ProductDetailPage from "./pages/product-detail-page";
import AIChatSupport from "./pages/ai-chat-support";
import ProductCatalogSearch from "./pages/product-catalog-search";
import CustomerDashboard from "./pages/customer-dashboard";
import EditProfile from "./pages/EditProfile";
import PaymentMethods from "./pages/PaymentMethods";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AIChatSupport />} />
      <Route path="/shopping-cart-checkout" element={<ShoppingCartCheckout />} />
      <Route path="/login-registration" element={<LoginRegistration />} />
      <Route path="/product-detail-page" element={<ProductDetailPage />} />
      <Route path="/ai-chat-support" element={<AIChatSupport />} />
      <Route path="/product-catalog-search" element={<ProductCatalogSearch />} />
      <Route path="/customer-dashboard" element={<CustomerDashboard />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/payment-methods" element={<PaymentMethods />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
