
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navLinks = [{ name: "Home", path: "/" },
    { name: "Campaigns", path: "/campaigns" },
    { name: "About", path: "/about" },
    { name: "Contact us", path: "/contact" },];
    return (
        <nav className="h-[80px] bg-[#0A3A45] flex items-center justify-between px-4 md:px-16 text-white font-['Inter'] z-50 ">
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
            <button
                className="md:hidden text-2xl"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? '✕' : '☰'}
            </button>
            <div className="hidden md:flex items-center gap-6">
                <button
                    onClick={() => navigate('/signin')}
                    className="text-[16px] hover:text-[#FFC107] transition-colors">Sign in</button>
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

            {isMenuOpen && (
                <ul className="absolute top-[80px] left-0 w-full bg-[#0A3A45] bg-[#0A3A45]/90 backdrop-blur-md flex flex-col items-center gap-6 py-6 md:hidden z-40 shadow-lg">
                    {navLinks.map((link) => (
                        <li
                            key={link.name}
                            onClick={() => {
                                navigate(link.path);
                                setIsMenuOpen(false);
                            }}
                            className={`cursor-pointer text-[18px] ${location.pathname === link.path
                                ? "text-[#FFC107]"
                                : "text-white"
                                }`}
                        >
                            {link.name}
                        </li>
                    ))}
                </ul>
            )}



        </nav>
    )
}

export default Navbar