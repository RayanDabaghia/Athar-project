import { campaigns } from '../../data/campaigns'
import locationIcon from '../../images/location.png'
import Union from '../../images/Union.png'
import vector from '../../images/Vector.png'

const SmallCampaignCard = () => {
    return (
        <div className="bg-white rounded-[56px] p-6 shadow-sm w-[800px]  mt-[20px] " style={{ boxShadow: '0px 8px 4px 0px rgba(0,0,0,0.25)' }} >

            {/* العنوان */}
            <div className="flex justify-between items-center mb-4 px-2 ">
                <div>
                    <h3 className="text-[20px] font-normal font-adlam text-[#0A3A45]">Featured Campaigns</h3>
                    <div className="w-[40px] h-[3px] bg-[#FFC107] rounded-full mt-1"></div>
                </div>
                <span className="text-[14px] text-[#0A3A45] font-inter cursor-pointer hover:text-[#FFC107]">view all</span>
            </div>

            {/* الكروت */}
            <div className="flex gap-4 justify-center">
                {campaigns.map((camp) => (
                    <div key={camp.id} className="w-[195px] flex-shrink-0 flex flex-col items-center rounded-[40px] bg-white p-3 border border-gray-100">
                        <div className="w-full h-[140px] w-[180px] rounded-[52px] border-[7px] border-[#0A3A45] overflow-hidden mb-3">
                            <img src={camp.image} alt={camp.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="w-full text-left px-1 ">
                            <h3 className="text-[13px] font-medium font-outfit text-[#06272F] mb-2  overflow-hidden truncate w-full cursor-pointer " title={camp.title}>{camp.title}</h3>
                            <div className="w-[40px] h-[2px] bg-[#FFC107] rounded-full mb-4"></div>
                            <div className="flex items-center gap-1 mb-4">
                                <img src={Union} alt="org" className="w-4 h-4" />
                                <span className="text-[11px] text-[#06272F] text-poppins">{camp.organization}</span>
                            </div>
                            <div className="flex items-center gap-1 mb-4">
                                <img src={locationIcon} alt="location" className="w-4 h-4" />
                                <span className="text-[11px] text-[#06272F] text-poppins">{camp.location}</span>
                            </div>
                            <div className="flex items-center gap-4 mb-4">
                                <img src={vector} alt="rating" className="w-4 h-4" />
                                <span className="text-[11px] text-[#06272F] text-poppins">{camp.rating}</span>
                                <div className="w-[1px] h-3 bg-[#FFC107]"></div>
                                <span className="text-[11px] text-[#06272F] text-poppins">{camp.reviews} Reviews</span>
                            </div>
                            <div className="flex justify-center">
                                <button className="bg-[#0A3A45] text-white text-[11px] px-6 py-2 rounded-[16px] font-bold font-outfit " style={{ boxShadow: '0px 4px 6px rgba(0,0,0,0.2)' }}>
                                    See details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SmallCampaignCard