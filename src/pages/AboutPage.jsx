import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import checkIcon from '../images/Icons/CheckIconYellow.png'

const AboutPage = () => {
    return (
        <div className="w-full min-h-screen bg-[#F7F9FA] flex flex-col">
            <Navbar />

            <div className="max-w-[1105px] mx-auto px-6 py-16 flex flex-col gap-16">

                {/* Who We Are */}
                <div>
                    <h2 className="text-[96px] font-normal font-inter text-[#0A3A45]">Who We Are?</h2>
                    <div className="w-[54px] h-[4px] bg-[#FFC107] rounded-full mt-[-10px] ml-[18px] mb-6"></div>
                    <p className="text-[32px]  font-medium font-inter text-[#06272F] leading-[150%]">
                        Athar is a digital platform designed to connect people with volunteer opportunities and community initiatives that create real impact. We believe that every person has the ability to make a positive difference, regardless of their experience, time, or resources.
                    </p>
                </div>

                {/* Our Vision */}
                <div>
                    <h2 className="text-[96px] font-normal font-inter text-[#0A3A45]">Our Vision</h2>
                    <div className="w-[54px] h-[4px] bg-[#FFC107] rounded-full mt-[-10px] ml-[18px] mb-6"></div>
                    <p className="text-[32px]  font-medium font-inter text-[#06272F] leading-[150%]">
                        We aim to build a more connected and compassionate society where volunteering becomes a natural part of everyday life, and where everyone can easily find ways to contribute.
                    </p>
                </div>

                {/* Our Mission */}
                <div>
                    <h2 className="text-[96px] font-normal font-inter text-[#0A3A45]">Our Mission</h2>
                    <div className="w-[54px] h-[4px] bg-[#FFC107] rounded-full mt-[-10px] ml-[18px] mb-6"></div>
                    <p className="text-[32px]  font-medium font-inter text-[#06272F] leading-[150%]">
                        Our mission is to simplify access to volunteer opportunities, support organizations in reaching the right volunteers, and create a digital space that encourages giving and collaboration.
                    </p>
                </div>

                {/* Why Athar */}
                <div>
                    <h2 className="text-[96px] font-normal font-inter text-[#0A3A45]">Why Athar?</h2>
                    <div className="w-[54px] h-[4px] bg-[#FFC107] rounded-full mt-[-10px] ml-[18px] mb-6"></div>
                    <p className="text-[32px]  font-medium font-inter text-[#06272F] leading-[150%]">
                        Many people want to help but do not know where to start, while many organizations need support but struggle to reach the right people. Athar bridges this gap and brings both sides together.
                    </p>
                </div>

                {/* What We Offer */}
                <div>
                    <h2 className="text-[96px] font-normal font-inter text-[#0A3A45]">What We Offer?</h2>
                    <div className="w-[54px] h-[4px] bg-[#FFC107] rounded-full mt-[-10px] ml-[18px] mb-6"></div>
                    <div className="flex flex-col gap-3 text-[32px]  font-semibold font-inter text-[#06272F]">
                        {[
                            "Discover meaningful volunteer opportunities",
                            "Join impactful campaigns and initiatives",
                            "Connect volunteers with organizations",
                            "Easy and organized participation experience",
                            "A platform that inspires change"
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-3">
                                <img src={checkIcon} alt="check" className="w-[20px] h-[23px]" />
                                <span className="text-[32px]  font-medium font-inter text-[#06272F]">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Our Values */}
                <div>
                    <h2 className="text-[96px] font-normal font-inter text-[#0A3A45]">Our Values</h2>
                    <div className="w-[54px] h-[4px] bg-[#FFC107] rounded-full mt-[-10px] ml-[18px] mb-6"></div>
                    <p className="text-[32px]  font-medium font-inter text-[#06272F] leading-[150%]">
                        We believe in collaboration, responsibility, transparency, humanity, and creating real impact through collective action.
                    </p>
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default AboutPage