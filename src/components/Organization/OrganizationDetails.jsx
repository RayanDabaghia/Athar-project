import locationIcon from '../../images/location.png'
import emailIcon from '../../images/icons/sms.png'
import callIcon from '../../images/icons/call.png'
import websiteIcon from '../../images/icons/website.png'
import arrowBack from '../../images/Icons/arrow.png'
import { useNavigate } from 'react-router-dom'
import org from '../../images/org.png.png'

const OrganizationDetails = ({ organization }) => {
    const navigate = useNavigate()

    return (
        <div className="max-w-[1300px] mx-auto my-10 sm:px-6 relative z-10">
            {/* سهم الرجوع */}
            <img
                src={arrowBack}
                alt="back"
                className="w-8 h-8 sm:w-[38px] sm:h-[33px] cursor-pointer mb-4"
                onClick={() => navigate('/organizations')}
            />

            <div className="bg-white rounded-[22px] p-5 sm:p-8 flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start shadow-lg border border-gray-200">

                <div className="relative flex items-center flex-shrink-0">
                    {/* الشعار */}
                    <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-[24px] sm:rounded-[32px] border-4 sm:border-[6px] border-[#0A3A45] overflow-hidden flex-shrink-0 bg-gray-50">
                        <img src={org} alt={organization.name} className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* المحتوى */}
                <div className="flex flex-col gap-3 relative w-full text-center sm:text-left">
                    <h2 className="text-[22px] sm:text-[28px] font-bold font-outfit text-[#0A3A45]">{organization.name}</h2>
                    <div className="w-[50px] h-1 bg-[#FFC107] rounded-full mx-auto sm:mx-0"></div>
                    <p className="text-[14px] sm:text-[15px] font-light font-poppins text-[#06272F] leading-[24px] sm:leading-[26px]">
                        {organization.description}
                    </p>

                    {/* صف الأيقونات: الموقع، الإيميل، الهاتف، الويبسايت */}
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-2">
                        <div className="flex items-center gap-2">
                            <img src={locationIcon} alt="location" className="w-5 h-5" />
                            <span className="text-[13px] text-[#06272F]">{organization.location}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <img src={emailIcon} alt="email" className="w-5 h-5" />

                            <a href={`mailto:${organization.email}`}
                                className="text-[13px] text-[#06272F] hover:underline"
                            >
                                {organization.email}
                            </a>
                        </div>

                        <div className="flex items-center gap-2">
                            <img src={callIcon} alt="phone" className="w-5 h-5" />

                            <a href={`tel:${organization.phone}`}
                                className="text-[13px] text-[#06272F] hover:underline"
                            >
                                {organization.phone}
                            </a>
                        </div>


                        <a href={organization.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-[#FFC107] rounded-full px-4 py-1.5 hover:bg-[#e6ac00] transition"
                        >
                            <img src={websiteIcon} alt="website" className="w-4 h-4" />
                            <span className="text-[13px] font-medium text-[#0A3A45]">Our Website</span>
                        </a>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default OrganizationDetails