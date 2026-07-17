import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import CampaignsPage from './pages/Campaigns'
import CampaignDetailsPage from './pages/CampaignDetailsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import VolunteerHomePage from './pages/Volunteer/VolunteerHomePage'
import SelectRolePage from './pages/SelectRolePage'
import VolunteerSignUpPage from './pages/Volunteer/VoulnteerSignUpPage'
import OrgSignUpPage from './pages/Organization/OrgSignUpPage'
import SignInPage from './pages/SignInPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import './App.css'
import './index.css'
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/campaigns" element={<CampaignsPage />} />
        <Route path="/campaigns/:id" element={<CampaignDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/volunteer" element={<VolunteerHomePage />} />
        <Route path="/get-started" element={<SelectRolePage />} />
        <Route path="/signup/volunteer" element={<VolunteerSignUpPage />} />
        <Route path="/signup/organization" element={<OrgSignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/select-role" element={<SelectRolePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App