import { useNavigate, useLocation } from 'react-router-dom'
import notificationIcon from '../../images/Icons/notification.svg'
import profileIcon from '../../images/Icons/profile.svg'

const VolunteerNavbar = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const navLinks = [
        { name: "Home", path: "/volunteer" },
        { name: "Organization", path: "/volunteer/organization" },
        { name: "Campaigns", path: "/volunteer/campaigns" },
        { name: "My campaigns", path: "/volunteer/my-campaigns" },
    ]

    return (
        <nav className="h-[80px] bg-[#0A3A45] flex items-center justify-between px-16 text-[#F7F9FA] font-['Inter'] text-normal relative z-50">

            {/* اللوغو */}
            <div className="flex items-center gap-2">
                <div className="w-[45px] h-[45px] bg-[#FFC107] rounded-lg"></div>
                <span className="text-2xl font-bold tracking-wider">ATHAR</span>
            </div>

            {/* الروابط */}
            <ul className="hidden md:flex items-center gap-[33px] text-[20px] h-full leading-[100%]">
                {navLinks.map((link) => (
                    <li
                        key={link.name}
                        onClick={() => navigate(link.path)}
                        className={`cursor-pointer transition-all relative flex items-center h-[80px]
                            ${location.pathname === link.path || location.pathname.startsWith(link.path + '/')
                                ? "text-[#FFC107] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[4px] after:bg-[#FFC107]"
                                : "text-white hover:text-[#FFC107]"
                            }`}
                    >
                        {link.name}
                    </li>
                ))}
            </ul>

            {/* الأيقونات */}
            <div className="flex items-center gap-4">
                <img src={notificationIcon} alt="notifications" className="w-[25px] h-[25px] cursor-pointer hover:[filter:invert(30%)_sepia(50%)_saturate(500%)_hue-rotate(5deg)_brightness(120%)]" />
                <img src={profileIcon} alt="profile" className="w-[25px] h-[25px] cursor-pointer hover:[filter:invert(30%)_sepia(50%)_saturate(500%)_hue-rotate(5deg)_brightness(120%)]" />
                <div className="flex items-center gap-1 cursor-pointer text-[16px] font-semibold">
                    <span>EN</span>
                    <span className="text-[12px] opacity-80">▼</span>
                </div>
            </div>

        </nav>
    )
}

export default VolunteerNavbar