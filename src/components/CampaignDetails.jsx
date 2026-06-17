import locationIcon from '../images/location.png'
import Union from '../images/Union.png'
import vector from '../images/Vector.png'
import arrowBack from '../images/Icons/arrow.png'
import arrowLeft from '../images/Icons/arrow-left (5).png'
import arrowRight from '../images/Icons/arrow-right.png'
import { useNavigate } from 'react-router-dom'
const CampaignDetails = ({ campaign }) => {
    const navigate = useNavigate()
    return (
        <div className="max-w-[1310px] mx-auto my-10 px-6 relative z-10">
            {/* سهم الرجوع */}
            <img
                src={arrowBack}
                alt="back"
                className="w-[38px] h-[33px] cursor-pointer mb-4"
                onClick={() => navigate('/campaigns')}
            />
            <div className="bg-white rounded-[22px] p-10 flex gap-16 items-center shadow-lg border border-gray-200">

                <div className="relative flex items-center flex-shrink-0">
                    {/* سهم يسار */}
                    <img
                        src={arrowLeft}
                        alt="previous"
                        className="absolute left-[-35px] w-[30px] h-[40px] cursor-pointer z-20"
                    />
                    {/* الصورة */}
                    <div className="w-[549px] h-[549px] rounded-[52px] border-[7px] border-[#0A3A45] overflow-hidden flex-shrink-0">
                        <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
                    </div>
                    <img
                        src={arrowRight}
                        alt="next"
                        className="absolute right-[-35px] w-[30px] h-[40px] cursor-pointer z-20"
                    />
                </div>
                {/* المحتوى */}
                <div className="flex flex-col gap-4 relative">
                    <h2 className="text-[36px] font-bold font-outfit text-[#0A3A45]">{campaign.title}</h2>
                    <div className="absolute top-14 w-[60px] h-[4px] bg-[#FFC107] rounded-full"></div>
                    <p className="text-[20px] font-light font-poppins text-[#06272F] leading-[30px] w-[544px] h-[336px] overflow-auto mt-4">{campaign.description}</p>
                    <div className="flex flex-col gap-3 mt-[-60px]">
                        <div className="flex items-center gap-2">
                            <img src={Union} alt="org" className="w-5 h-5" />
                            <span className="text-[14px] text-[#06272F]">{campaign.organization}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <img src={locationIcon} alt="location" className="w-5 h-5" />
                            <span className="text-[14px] text-[#06272F]">{campaign.location}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <img src={vector} alt="rating" className="w-5 h-5" />
                            <span className="text-[14px] text-[#06272F]">{campaign.rating}</span>
                            <div className="w-[1px] h-4 bg-[#FFC107]"></div>
                            <span className="text-[14px] text-[#06272F]">{campaign.reviews} Reviews</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CampaignDetails