import locationIcon from '../images/location.png'
import vector from '../images/Vector.png'
import Union from '../images/Union.png'
import { useNavigate } from 'react-router-dom'

const CampaignCard = ({ camp }) => {
    const navigate = useNavigate()
    return (
        <div key={camp.id} className="bg-white rounded-[40px] p-6 shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-xl transition-all duration-300">

            {/* حاوية الصورة مع الإطار الكحلي */}
            <div className="w-full h-[320px] rounded-[35px] border-[7px] border-[#0A3A45] overflow-hidden mb-6">
                <img
                    src={camp.image}
                    alt={camp.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* تفاصيل الكرت */}
            <div className="w-full text-left px-2">
                <div className="relative pb-3 mb-3 w-full">
                    <h3 className="text-[22px] font-bold font-outfit text-[#0A3A45] mb-3">{camp.title}</h3>
                    <div className="absolute left-0 bottom-4 w-[60px] h-[3px] bg-[#FFC107] rounded-full"></div>
                </div>
                {/* ااسم المنظمة*/}
                <div className="flex items-center gap-2 mb-3">
                    <img src={Union} alt="Union" className="w-5 h-5 object-contain" />
                    <span className="text-[#06272F] text-[14px] font-light font-poppins">{camp.organization}</span>
                </div>
                {/* الموقع باستخدام الأيقونة الثابتة المستوردة من فيجما */}
                <div className="flex items-center gap-2 mb-3">
                    <img src={locationIcon} alt="Location" className="w-5 h-5" />

                    <span className="text-[#06272F] text-[14px] font-light font-poppins">{camp.location}</span>
                </div>

                {/* التقييم */}
                <div className="flex items-center gap-3 mb-8">
                    <img src={vector} alt="vector" className="w-5 h-5" />
                    <span className="text-[#06272F] font-light text-[14px] font-poppins">{camp.rating}</span>

                    {/* الخط الفاصل العمودي */}
                    <div className="w-[1px] h-4 bg-[#FFC107]"></div>

                    <span className="text-[#06272F] text-[14px] font-light font-poppins">{camp.reviews} Reviews</span>
                </div>

                {/* زر التفاصيل */}
                <div className="flex justify-center">
                    <button
                        onClick={() => navigate(`/campaigns/${camp.id}`)}
                        className=" w-[163x] h-[70px] bg-[#0A3A45] text-white text-[16px] px-12 py-3 rounded-[26px]  font-bold font-outfit  shadow-[0_6px_6px_0_rgba(102,102,102,0.8)] hover:bg-[#0d4a57] transition-all">
                        See details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CampaignCard;