import { useState, useEffect } from 'react'
import CampaignCard from '../CampaignCard';
import CampaignSearchFilterBar from '../Organization/CampaignSearchFilterBar';
import api from '../../api/axios'

const OrgFeaturedCampaign = ({ organizationId }) => {
    const [campaigns, setCampaigns] = useState([])
    const [loading, setLoading] = useState(true)

    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('All Campaigns')

    useEffect(() => {
        const fetchCampaigns = async () => {
            setLoading(true)
            try {
                const params = {};

                if (searchTerm.trim()) {
                    params.search = searchTerm.trim();
                }
                if (statusFilter && statusFilter !== 'All Campaigns') {
                    params.status = statusFilter; // ⚠️ الباك اند بيفلتر على أساس هاد القيمة
                }
                if (organizationId) {
                    params.organization_id = organizationId; // ⚠️ منتأكد من اسم البارام الصحيح مع الباك اند
                }

                const response = await api.get('/campaigns', { params })
                setCampaigns(response.data.campaigns)
            } catch (error) {
                console.error('Failed to fetch campaigns:', error)
            } finally {
                setLoading(false)
            }
        }

        const timeoutId = setTimeout(() => {
            fetchCampaigns();
        }, 400); // debounce بسيط عالبحث

        return () => clearTimeout(timeoutId);
    }, [searchTerm, statusFilter, organizationId])

    return (
        <section className="bg-[#F7F9FA] py-20 px-4">
            <div className="max-w-[1309px] mx-auto text-center">

                {/* العنوان الرئيسي للقسم */}
                <div className="relative w-max mx-auto flex flex-col items-center mb-10">
                    <h2 className="text-[40px] font-bold font-outfit text-[#0A3A45]">Featured Campaigns</h2>
                    <div className="absolute left-5 bottom-[-8px]  w-[50px] h-[4px] bg-[#FFC107] mt-2 rounded-full"></div>
                </div>

                {/* شريط البحث والفلاتر */}
                <div className="mb-12 text-left w-full">
                    <CampaignSearchFilterBar
                        searchValue={searchTerm}
                        onSearchChange={setSearchTerm}
                        onStatusChange={setStatusFilter}
                    />
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

export default OrgFeaturedCampaign;