import Navbar from '../components/Navbar'
import FeaturedCampaigns from '../components/FeaturedCampaigns'
import Footer from '../components/Footer'
import SectionTitle from '../components/SectionTitle'
const CampaignsPage = () => {
    return (
        <div className="w-full min-h-screen bg-[#F7F9FA] flex flex-col">
            <Navbar />
            <SectionTitle title="Featured Campaigns" description="Explore our featured campaigns and make a difference in your community." />
            <FeaturedCampaigns />
            <Footer />
        </div>
    )
}

export default CampaignsPage