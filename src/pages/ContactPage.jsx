import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ContactPage = () => {
    return (
        <div className="w-full min-h-screen bg-[#F7F9FA] flex flex-col">
            <Navbar />

            <div className="max-w-[1105px] mx-auto px-6 py-16 flex flex-col gap-16">

                {/* Get in Touch */}
                <div>
                    <h2 className="text-[96px] font-normal font-inter text-[#0A3A45]">Get in Touch</h2>
                    <div className="w-[54px] h-[4px] bg-[#FFC107] rounded-full mt-[-10px] ml-[18px] mb-6"></div>
                    <p className="text-[32px]  font-medium font-inter text-[#06272F] leading-[150%]">
                        We would love to hear from you. Whether you have a question, suggestion, or would like to know more about Athar, feel free to contact us anytime and our team will be happy to assist you.
                    </p>
                </div>

                {/* Partnership */}
                <div>
                    <h2 className="text-[96px] font-normal font-inter text-[#0A3A45]">Partnership</h2>
                    <div className="w-[54px] h-[4px] bg-[#FFC107] rounded-full mt-2 mb-6"></div>
                    <p className="text-[32px]  font-medium font-inter text-[#06272F] leading-[150%]">
                        We welcome collaboration with organizations, communities, and businesses that share our vision. If you need support using the platform, our team is ready to help and provide the guidance you need.
                    </p>
                </div>

                {/* Stay Connected */}
                <div>
                    <h2 className="text-[96px] font-normal font-inter text-[#0A3A45]">Stay Connected</h2>
                    <div className="w-[54px] h-[4px] bg-[#FFC107] rounded-full mt-[-10px] ml-[18px] mb-6"></div>
                    <p className="text-[32px]  font-medium font-inter text-[#06272F] leading-[150%]">
                        You can contact us through email or phone. We are always ready to listen, support, and respond as quickly as possible.
                    </p>
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default ContactPage