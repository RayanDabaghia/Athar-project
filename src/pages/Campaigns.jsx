import Navbar from '../components/Navbar'
import FeaturedCampaigns from '../components/FeaturedCampaigns'
import Footer from '../components/Footer'

const CampaignsPage = () => {
    return (
        <div className="w-full min-h-screen bg-[#F7F9FA] flex flex-col">
            <Navbar />
            <FeaturedCampaigns />
            <Footer />
        </div>
    )
}

export default CampaignsPage