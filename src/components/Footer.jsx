import logoAthar from "../images/LogoAthar.png"
import emailIcon from "../images/Icons/email.png"
import phonelIcon from "../images/Icons/phone.png"
import pinIcon from "../images/Icons/pin.png"
const Footer = () => {
    return (
        <footer className="bg-[#F7F9FA]">

            <div className=" py-12 px-16 grid grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-8 items-center">

                {/* اللوغو */}
                <div className="">
                    <img src={logoAthar} alt="Athar Logo" className="max-w-[200px] h-auto" />
                </div>
                <div>
                    {/* العمود الأول*/}
                    <h3 className="font-bold text-[#06272F] mb-4">Menu</h3>
                    <ul className="flex flex-col gap-2">
                        {["Campaigns", "Terms & conditions", "Privacy policy", "About us"].map((item) => (
                            <li key={item}>
                                <a href="#" className="text-[#6F7775] hover:text-[#F4C542] text-sm">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ===== العمود الثاني: About us ===== */}
                <div>
                    <h3 className="font-bold text-[#06272F] mb-6">About us</h3>
                    <ul className="flex flex-col gap-2">
                        {["How it work?", "Contact us", "FAQ", "Help"].map((item) => (
                            <li key={item}>
                                <a href="#" className="text-[#6F7775] hover:text-[#F4C542] text-sm">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* ===== العمود الثالث: Contacts Info ===== */}
                <div>
                    <h3 className="font-bold text-[#06272F] mb-4">Contacts Info</h3>

                    {/* flex flex-col gap-4 → كل معلومة تحت التانية بمسافة */}
                    <ul className="flex flex-col gap-4">
                        <li className="flex items-center gap-3">
                            <img src={phonelIcon} alt="phone" />
                            <div className="leading-[20px] text-[14px]">
                                <p className="text-outfit font-semibold text-[#06272F]">Call us</p>
                                <p className="text-outfit text-[#6F7775]">+963-906-156-2849</p>
                            </div>
                        </li>

                        <li className="flex items-center gap-3">
                            <img src={emailIcon} alt="email" />
                            <div className="leading-[20px] text-[14px]">
                                <p className="text-outfit font-semibold text-[#06272F]">Mail Us</p>
                                <p className="text-outfit text-[#6F7775]">Athar@gmail.com</p>
                            </div>
                        </li>

                        <li className="flex items-center gap-3">
                            <img src={pinIcon} alt="pin" />
                            <div className="leading-[20px] text-[14px]">
                                <p className="text-outfit font-semibold text-[#06272F]">Visit Us</p>
                                <p className="text-outfit text-[#6F7775]">Syria-Aleppo</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="bg-[#0A3A45] text-white text-center py-4 text-sm border-t-[3px] border-[#F4C542]">
                All Rights Reserved.
            </div>

        </footer>
    );
};

export default Footer;
