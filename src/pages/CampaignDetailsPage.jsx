import { useParams } from 'react-router-dom'
import { campaigns } from '../data/campaigns'
import Navbar from '../components/Navbar'
import CampaignDetails from '../components/CampaignDetails'
import CampaignStats from '../components/StateSection'
import Footer from '../components/Footer'
import HowToImpact from '../components/HowToImpact'

const CampaignDetailsPage = () => {
    const { id } = useParams()
    const campaign = campaigns.find((c) => c.id === Number(id))

    return (
        <div className="w-full min-h-screen bg-[#F7F9FA] flex flex-col">
            <Navbar />
            <CampaignDetails campaign={campaign} />
            <CampaignStats stats={campaign.stats} className="mt-[-120px]" />
            <HowToImpact />
            <Footer />
        </div>
    )
}

export default CampaignDetailsPage