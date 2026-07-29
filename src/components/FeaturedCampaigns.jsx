import { useState, useEffect } from 'react'
import CampaignCard from './CampaignCard';
import api from '../api/axios'

const FeaturedCampaigns = () => {
    const [campaigns, setCampaigns] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await api.get('/campaigns')
                setCampaigns(response.data.campaigns)
            } catch (error) {
                console.error('Failed to fetch campaigns:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchCampaigns()
    }, [])
    return (
        <section className="bg-[#F7F9FA] py-20 px-4">
            <div className="max-w-[1309px] mx-auto text-center">

                {/* العنوان الرئيسي للقسم */}
                <div className="relative w-max mx-auto flex flex-col items-center mb-16">
                    <h2 className="text-[40px] font-bold font-outfit text-[#0A3A45]">Featured Campaigns</h2>
                    <div className="absolute left-5 bottom-[-8px]  w-[50px] h-[4px] bg-[#FFC107] mt-2 rounded-full"></div>
                </div>

                {/* شبكة الكروت المتجاوبة */}
                {loading ? (
                    <p className="text-[#5C6B73] font-poppins">Loading campaigns...</p>
                ) : campaigns.length === 0 ? (
                    <p className="text-[#5C6B73] font-poppins">No campaigns available right now.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {campaigns.map((camp) => (
                            <CampaignCard key={camp.id} camp={camp} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedCampaigns;