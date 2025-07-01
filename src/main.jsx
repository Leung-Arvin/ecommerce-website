import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import './index.css'
import App from './App.jsx'
import LandingPage from './pages/landing-page/LandingPage.jsx';
import SurveyPage from './pages/survey-page/SurveyPage.jsx';
import SurveyConfirmationPage from './pages/survey-confirmation-page/SurveyConfirmationPage.jsx';
import CheckoutFormPage from './pages/checkout-form-page/CheckoutFormPage.jsx';
import CheckoutConfirmationPage from './pages/checkout-confirmation-page/CheckoutConfirmationPage.jsx';
import { CartProvider } from './contexts/CartContext';

createRoot(document.getElementById('root')).render(
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/survey" element={<SurveyPage/>}/>
          <Route path="/survey-confirmation" element={<SurveyConfirmationPage/>}/>
          <Route path="/checkout-form" element={<CheckoutFormPage/>} />
          <Route path="/checkout-confirmation" element={<CheckoutConfirmationPage/>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
)
