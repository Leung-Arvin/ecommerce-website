import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import './index.css'
import App from './App.jsx'
import LandingPage from './pages/landing-page/LandingPage.jsx';
import SurveyPage from './pages/survey-page/SurveyPage.jsx';
import SurveyConfirmationPage from './pages/survey-confirmation-page/SurveyConfirmationPage.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/survey" element={<SurveyPage/>}/>
        <Route path="/survey-confirmation" element={<SurveyConfirmationPage/>}/>
      </Routes>
    </BrowserRouter>
)
