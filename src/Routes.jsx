import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ShoppingCartCheckout from './pages/shopping-cart-checkout';
import LoginRegistration from './pages/login-registration';
import ProductDetailPage from './pages/product-detail-page';
import AIChatSupport from './pages/ai-chat-support';
import ProductCatalogSearch from './pages/product-catalog-search';
import CustomerDashboard from './pages/customer-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AIChatSupport />} />
        <Route path="/shopping-cart-checkout" element={<ShoppingCartCheckout />} />
        <Route path="/login-registration" element={<LoginRegistration />} />
        <Route path="/product-detail-page" element={<ProductDetailPage />} />
        <Route path="/ai-chat-support" element={<AIChatSupport />} />
        <Route path="/product-catalog-search" element={<ProductCatalogSearch />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
