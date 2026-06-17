import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CampaignsPage from './pages/Campaigns'
import CampaignDetailsPage from './pages/CampaignDetailsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import VolunteerHomePage from './pages/Volunteer/VolunteerHomePage'
import SelectRolePage from './pages/SelectRolePage'
import VolunteerSignUpPage from './pages/Volunteer/VoulnteerSignUpPage'
import OrgSignUpPage from './pages/Organization/OrgSignUpPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/campaigns" element={<CampaignsPage />} />
        <Route path="/campaigns/:id" element={<CampaignDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/volunteer" element={<VolunteerHomePage />} />
        <Route path="/get-started" element={<SelectRolePage />} />
        <Route path="/signup/volunteer" element={<VolunteerSignUpPage />} />
        <Route path="/signup/organization" element={<OrgSignUpPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App