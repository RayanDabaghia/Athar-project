import { notifications } from '../../data/campaigns'
import yellowTime from '../../images/Icons/yellowTime.png'
import newCampaign from '../../images/Icons/newcampaign.png'
import newCertificate from '../../images/Icons/newcertificate.png'
import accepted from '../../images/Icons/accepted.png'

const iconMap = {
    campaign: newCampaign,
    certificate: newCertificate,
    accepted: accepted
}

const Notifications = () => {
    return (
        <div className="bg-white rounded-[56px] p-8 w-[629px] flex flex-col"
            style={{ boxShadow: '0px 8px 4px 0px rgba(0,0,0,0.25)' }}>

            {/* العنوان */}
            <div className="flex justify-between items-center mb-[-6px] px-2">
                <div>
                    <h3 className="text-[24px] font-normal text-[#06272F] font-adlam">Notifications</h3>
                    <div className="w-[40px] h-[3px] bg-[#FFC107] rounded-full mt-1"></div>
                </div>
                <span className="text-[14px] text-[#0A3A45] font-inter cursor-pointer hover:text-[#FFC107]">view all</span>
            </div>

            {/* القائمة */}
            <div className="flex flex-col gap-3 justify-around flex-1 mt-4">
                {notifications.map((notif, index) => (
                    <div key={notif.id}>
                        <div className="flex items-start gap-4 py-3">
                            {/* الأيقونة */}
                            <img src={iconMap[notif.type]} alt={notif.type}
                                className="w-[50px] h-[50px] flex-shrink-0" />

                            {/* المحتوى */}
                            <div className="flex flex-col gap-1">
                                <p className="text-[18px] font-medium text-[#06272F] font-outfit">{notif.message}</p>
                                <div className="flex items-center gap-1">
                                    <img src={yellowTime} alt="time" className="w-[14px] h-[14px]" />
                                    <span className="text-[12px] text-[#06272F] text-light font-poppins leading-[16px]">{notif.time}</span>
                                </div>
                            </div>
                        </div>

                        {/* فاصل */}
                        {index < notifications.length - 1 && (
                            <div className="w-full h-[1px] bg-[#FFC107] opacity-40"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Notifications