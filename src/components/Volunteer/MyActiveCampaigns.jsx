import { myActiveCampaigns } from '../../data/campaigns'
import locationIcon from '../../images/location.png'
import calendarIcon from '../../images/Icons/calender.png'

const statusStyles = {
    Accepted: "bg-[#34C7595C] text-[#16353C]",
    Pending: "bg-[#FFC10769] text-[#745700]",
    Rejected: "bg-[#34C7595C] text-[#16353C]"
}

const MyActiveCampaigns = () => {
    return (
        <div className="bg-white rounded-[56px] p-6 w-[468px] mt-[20px] flex flex-col"
            style={{ boxShadow: '0px 8px 4px 0px rgba(0,0,0,0.25)' }}>

            {/* العنوان */}
            <div className="flex justify-between items-center mb-4 px-2">
                <div>
                    <h3 className="text-[20px] font-normal text-[#06272F] font-adlam ">My Active Campaigns</h3>
                    <div className="w-[40px] h-[3px] bg-[#FFC107] rounded-full mt-1"></div>
                </div>
                <span className="text-[14px] text-[#0A3A45] font-inter cursor-pointer hover:text-[#FFC107]">view all</span>
            </div>

            {/* القائمة */}
            <div className="flex flex-col gap-3 mt-[30px]">
                {myActiveCampaigns.map((camp, index) => (
                    <div key={camp.id}>
                        <div className="flex items-center gap-3 py-2">
                            {/* الصورة */}
                            <img src={camp.image} alt={camp.title}
                                className="w-[70px] h-[70px] rounded-[16px] object-cover flex-shrink-0 border-2 border-[#0A3A45]" />

                            {/* المعلومات */}
                            <div className="flex-1">
                                <h4 className="text-[13px] font-medium font-outfit text-[#06272F] mb-1 truncate"
                                    title={camp.title}>
                                    {camp.title}
                                </h4>
                                <div className="flex items-center gap-1 mb-1">
                                    <img src={calendarIcon} alt="date" className="w-3 h-3" />
                                    <span className="text-[14px] text-[#06272F] font-poppins font-light">{camp.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <img src={locationIcon} alt="location" className="w-3 h-3" />
                                    <span className="text-[14px] text-[#06272F] font-poppins font-light">{camp.location}</span>
                                </div>
                            </div>

                            {/* الحالة */}
                            <span className={`text-[11px] font-semibold px-3 py-1 rounded-full flex-shrink-0 ${statusStyles[camp.status]}`}>
                                {camp.status}
                            </span>
                        </div>

                        {/* فاصل — مو على الأخير */}
                        {index < myActiveCampaigns.length - 1 && (
                            <div className="w-full h-[1px] bg-[#FFC107] opacity-40"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyActiveCampaigns