import checkIcon from "../images/checkIcon.png"

const HowToImpact = () => {
    return (
        <section className="bg-[#F7F9FA] py-16 px-6">
            <div className="max-w-[895px] mx-auto">

                {/* العنوان */}
                <div className="relative mb-8 ml-[-60px]">
                    <h2 className="text-[40px] font-normal font-adlam text-[#06272F]">
                        How Do You Want to Make an Impact?
                    </h2>
                    <div className="w-[54px] h-[4px] bg-[#FFC107] rounded-full mt-2 ml-[20px]"></div>
                </div>

                {/* السب تايتل */}
                <p className="text-[25px] font-outfit text-[#04171B] mb-[50px] ml-[-20px] leading-[22px]" >
                    Get Started in 3 Simple Steps
                </p>

                {/* الخطوات */}
                <div className="flex flex-col gap-8 mb-10">
                    <div className="flex items-center gap-3">
                        <img src={checkIcon} alt="check" className="w-[20px] h-[23px]" />
                        <span className="text-[18px]  font-outfit text-[#1D1D1D]">
                            <span className="font-semibold">Volunteer on the Ground ,</span> Join events and take direct action.
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <img src={checkIcon} alt="check" className="w-[20px] h-[23px]" />
                        <span className="text-[18px]  font-outfit text-[#1D1D1D]">
                            <span className="font-semibold">Spread Awareness ,</span> Use your voice on social media to inspire others.
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <img src={checkIcon} alt="check" className="w-[20px] h-[23px]" />
                        <span className="text-[18px]  font-outfit text-[#1D1D1D]">
                            <span className="font-semibold">Support the Initiative ,</span> Contribute by helping us grow, organize and impact.
                        </span>
                    </div>
                </div>

                {/* الزر */}
                <button className="bg-[#0A3A45] text-white px-10 py-4 rounded-[24px] font-bold font-outfit text-[16px] hover:bg-[#0d4a57] transition-all shadow-md">
                    Get Involved
                </button>

            </div>
        </section>
    )
}

export default HowToImpact