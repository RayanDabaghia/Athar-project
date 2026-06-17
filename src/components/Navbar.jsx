

import { useNavigate, useLocation } from 'react-router-dom';
const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const navLinks = [{ name: "Home", path: "/" },
    { name: "Campaigns", path: "/campaigns" },
    { name: "About", path: "/about" },
    { name: "Contact us", path: "/contact" },];
    return (
        <nav className="h-[80px] bg-[#0A3A45] flex items-center justify-between px-16 text-white font-['Inter'] ">
            <div className="flex items-center gap-2">
                <div className="w-[45px] h-[45px] bg-[#FFC107] rounded-lg"></div>
                <span className="text-2xl font-bold tracking-wider">ATHAR</span>
            </div>
            <ul className="hidden md:flex items-center gap-10 text-[20px] h-full">
                {navLinks.map((link) => (
                    <li
                        key={link.name}
                        onClick={() => { navigate(link.path) }}
                        className={`cursor-pointer transition-all relative flex items-center h-[80px]
                            ${location.pathname === link.path || location.pathname.startsWith(link.path + '/')
                                ? "text-[#FFC107] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[4px] after:bg-[#FFC107] "
                                : "text-white hover:text-[#FFC107]"
                            }`}
                    >
                        {link.name}
                    </li>
                ))}
            </ul>

            <div className="flex items-center gap-6">
                <button className="text-[16px] hover:text-[#FFC107] transition-colors">Sign in</button>
                <button
                    onClick={() => navigate('/get-started')}
                    className=" text-[16px] border-2 border-[#FFC107] text-[#FFC107] px-5 py-1.5 rounded-[10px] font-bold hover:bg-[#FFC107] hover:text-[#0A3A45] transition-all cursor-pointer">
                    Get started
                </button>
                <div className="flex items-center gap-1 cursor-pointer text-[16px] font-semibold">
                    <span>EN</span>
                    <span className="text-[12px] opacity-80">▼</span>
                </div>
            </div>




        </nav>
    )
}

export default Navbar