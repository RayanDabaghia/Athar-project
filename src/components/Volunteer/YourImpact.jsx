import { volunteerImpact } from '../../data/campaigns'
import timeIcon from '../../images/Icons/time.png'
import personIcon from '../../images/Icons/person.png'
import certificationIcon from '../../images/Icons/certification.png'

const YourImpact = () => {
    const { hours, joinedCampaigns, certificates } = volunteerImpact

    return (
        <div className="bg-white rounded-[56px] p-8 w-[302px] flex flex-col "
            style={{ boxShadow: '0px 8px 4px 0px rgba(0,0,0,0.25)' }}>

            {/* العنوان */}
            <div className="mb-6">
                <h3 className="text-[24px] font-normal font-adlam text-[#0A3A45]">Your Impact</h3>
                <div className="w-[40px] h-[3px] bg-[#FFC107] rounded-full mt-1"></div>
            </div>

            {/* الإحصائيات */}
            <div className="flex flex-col gap-4">

                <div className="flex flex-col items-center py-4">
                    <img src={timeIcon} alt="hours" className="w-[40px] h-[40px] mb-2" />
                    <span className="text-[18px] font-medium text-[#06272F] font-outfit">{hours} Volunteer Hours</span>
                </div>
                <div className="w-full h-[1px] bg-[#FFC107] opacity-40"></div>

                <div className="flex flex-col items-center py-4">
                    <img src={personIcon} alt="campaigns" className="w-[40px] h-[40px] mb-2" />
                    <span className="text-[18px] font-medium text-[#06272F] font-outfit">{joinedCampaigns} Joined Campaigns</span>
                </div>
                <div className="w-full h-[1px] bg-[#FFC107] opacity-40"></div>

                <div className="flex flex-col items-center py-4">
                    <img src={certificationIcon} alt="certificates" className="w-[40px] h-[40px] mb-2" />
                    <span className="text-[18px] font-medium text-[#06272F] font-outfit">{certificates} Certificates</span>
                </div>

            </div>
        </div>
    )
}

export default YourImpact