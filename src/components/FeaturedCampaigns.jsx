import CampaignCard from './CampaignCard';
import { campaigns } from '../data/campaigns'

const FeaturedCampaigns = () => {
    return (
        <section className="bg-[#F7F9FA] py-20 px-4">
            <div className="max-w-[1309px] mx-auto text-center">

                {/* العنوان الرئيسي للقسم */}
                <div className="relative w-max mx-auto flex flex-col items-center mb-16">
                    <h2 className="text-[40px] font-bold font-outfit text-[#0A3A45]">Featured Campaigns</h2>
                    <div className="absolute left-5 bottom-[-8px]  w-[50px] h-[4px] bg-[#FFC107] mt-2 rounded-full"></div>
                </div>

                {/* شبكة الكروت المتجاوبة */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {campaigns.map((camp) => (
                        <CampaignCard key={camp.id} camp={camp} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCampaigns;