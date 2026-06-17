import left1 from "../images/Left1.png"
import left2 from "../images/Left2.png"
import left3 from "../images/Left3.png"
const WhatweOffer = () => {
    return (
        <section className="bg-[#0A3A45] text-white py-20 px-4 w-full min-w-full block">
            <div className="max-w-[1440px] mx-auto">
                {/* منطقة العنوان الرئيسي مع الخط الأصفر المصحح هندسياً لتصحيح الانحياز */}
                <div className="text-center mb-4 flex flex-col items-center">
                    <h2 className="text-[48px] font-normal font-adlam text-white leading-[1.25] mb-2">
                        For Organizations
                    </h2>

                    <div className="relative pb-4">
                        <h3 className="text-[40px]  font-adlam text-white">
                            What we offer you ?
                        </h3>

                        <div className="absolute left-[50px] bottom-3  w-[50px] h-[4px] bg-[#FFC107] rounded-[50px]"></div>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center gap-10">
                    {/* سطر الميزة الأولى: اتجاه طبيعي (الصورة أولاً ثم النص) */}
                    <div className="w-full max-w-[1200px]  flex flex-col md:flex-row justify-between items-center gap-10  mb-[-200px]">

                        {/* كرت الصورة الأصفر (يسار) */}
                        <div className="w-full md:w-auto flex justify-center ">
                            <div className="w-full md:w-[587px]    flex items-center justify-center">
                                <img src={left1} alt="Easy Management" className="max-w-full max-h-full object-contain" />
                            </div>
                        </div>

                        {/* حاوية النصوص (يمين) */}
                        <div className="w-full md:max-w-[500px] text-left">
                            <h3 className="text-[48px]  text-[#F8F9FB] font-adlam mb-4" style={{ WebkitTextStroke: "1px #FFC107" }}>
                                Easy Management
                            </h3>
                            <p className="text-gray-300 text-[20px] font-Inter font-light leading-relaxed">
                                Create new campaigns, organize events, and manage all activities in one clear and simple platform.
                            </p>
                        </div>

                    </div>
                    <div className="w-full max-w-[1200px] min-h-[385px] flex flex-col md:flex-row-reverse justify-between items-center gap-10 mb-10 lg:ml-[60px] mb-[-200px] ">

                        {/* كرت الصورة الأصفر (يسار) */}
                        <div className="w-full md:w-auto flex justify-center">
                            <div className="w-full md:w-[587px]  flex items-center justify-center">
                                <img src={left2} alt="Easy Management" className="max-w-full max-h-full object-contain" />
                            </div>
                        </div>

                        {/* حاوية النصوص (يمين) */}
                        <div className="w-full md:max-w-[500px] text-left">
                            <h3 className="text-[48px]  text-[#F8F9FB] font-adlam mb-4" style={{ WebkitTextStroke: "1px #FFC107" }}>
                                Find Volunteers
                            </h3>
                            <p className="text-gray-300 text-[20px] font-Inter font-light leading-relaxed">
                                Reach active volunteers, review their requests, and choose the right people for each campaign quickly.
                            </p>
                        </div>

                    </div>


                    <div className="w-full max-w-[1200px] flex flex-col md:flex-row justify-between items-center gap-10">
                        {/* كرت الصورة الثالث */}
                        <div className="w-full md:w-[587px] flex items-center justify-center">
                            <img src={left3} alt="Feature Three" className="w-full h-auto object-contain" />
                        </div>
                        {/* حاوية النصوص الثالثة */}
                        <div className="w-full md:max-w-[500px] text-left">
                            <h3 className="text-[48px] font-normal text-[#F8F9FB] font-adlam mb-2" style={{ WebkitTextStroke: "1px #FFC107" }}>
                                Results Tracking
                            </h3>
                            <p className="text-[#CFCFCF] text-[20px] font-outfit font-light leading-relaxed">
                                Monitor campaign progress, track participation numbers, and measure the real impact of your efforts.                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center mt-20">
                    <button className="bg-[#FFEBAA] text-[#0A3A45] text-[32px] font-semibold font-Inter px-[40px] pt-[18px] pb-[18px] rounded-[26px] leading-[150%] transition-all duration-300 hover:bg-[#ffd875] hover:scale-105 active:scale-95 shadow-md">
                        Become a partner
                    </button>
                </div>
            </div>

        </section>
    )
}

export default WhatweOffer