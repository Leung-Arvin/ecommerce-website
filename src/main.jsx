import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./pages/landing-page/LandingPage.jsx";
import SurveyPage from "./pages/survey-page/SurveyPage.jsx";
import SurveyConfirmationPage from "./pages/survey-confirmation-page/SurveyConfirmationPage.jsx";
import CheckoutFormPage from "./pages/checkout-form-page/CheckoutFormPage.jsx";
import CheckoutConfirmationPage from "./pages/checkout-confirmation-page/CheckoutConfirmationPage.jsx";
import BrowsePage from "./pages/browse-page/BrowsePage.jsx";
import "./index.css";
import { CartProvider } from "./components/cart/CartContext.jsx";
import ProductDetail from "./pages/product-details/ProductDetail.jsx";

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route
          path="/new-arrivals"
          element={<BrowsePage product="new_arrivals" />}
        />
        <Route path="/snacks" element={<BrowsePage product="snacks" />} />
        <Route path="/drinks" element={<BrowsePage product="drinks" />} />
        <Route path="/bakery" element={<BrowsePage product="bakery" />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route
          path="/survey-confirmation"
          element={<SurveyConfirmationPage />}
        />
        <Route path="/checkout-form" element={<CheckoutFormPage />} />
        <Route
          path="/checkout-confirmation"
          element={<CheckoutConfirmationPage />}
        />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  </CartProvider>
);
