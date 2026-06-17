import work from "../images/work.jpg"
import Union2 from "../images/Union (2).png"
import checkIcon from "../images/checkIcon.png"
const HowItWorks = () => {
    return (
        <section className=" bg-[#F7F9FA] min-h-screen w-full flex items-center justify-center p-6" >
            <div className="w-full max-w-[1315px] min-h-[502px] mx-auto md:p-16 flex flex-col md:flex-row items-center gap-12">
                <div className="relative w-full max-w-[506px]">
                    <div className="absolute -top-4 -left-10 w-[96px] h-[92px] bg-[#F4C542] rounded-full flex items-center justify-center shadow-lg  z-30 ">
                        <img
                            src={Union2}
                            alt="icon"
                            className="w-[50%] h-[50%] object-contain"
                        />
                    </div>
                    <div className="w-full  h-auto min-h-[350px] md:h-[472px]
      rounded-[56px] 
      border-[7px] border-[#0A3A45] 
      overflow-hidden 
      flex items-center justify-center
      p-4 max-w-[506px] relative z-10 ">

                        <img
                            src={work}
                            alt="work"
                            className="w-full h-full object-contain max-h-[90%] relative  "
                        />

                    </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col items-start text-left self-start md:pt-4 ">
                    <div className="flex flex-col items-start mb-6  ml-[40px] relative">
                        <h2 className="text-[48px] font-adlam leading-[125%] text-[#06272F] tracking-[0px]">
                            How It Works?
                        </h2>
                        <div className="w-[54px] h-[4px] bg-[#FFC107] absolute bottom-[-8px] left-[38px] rounded-full"></div>
                    </div>
                    <div className="flex flex-col items-start mt-8 ml-[64px] w-full">
                        <p className="font-outfit text-[25px] font-normal text-[#06272F] leading-[22px] mb-8 ml-[40px]">
                            Get Started in 3 Simple Steps
                        </p>

                        {/* 3. الخطوات التلاتة ورا بعض بدون مصفوفات */}
                        <div className="flex flex-col gap-[18px] w-full mb-10 ml-[40px]">

                            {/* الخطوة 1 */}
                            <div className="flex items-center gap-4">
                                <img src={checkIcon} alt="check" className="w-[20px] h-[23px] object-contain shrink-0" />
                                <span className="text-[18px] font-semibold text-[#1D1D1D] font-outfit">
                                    Create your account
                                </span>
                            </div>

                            {/* الخطوة 2 */}
                            <div className="flex items-center gap-4">
                                <img src={checkIcon} alt="check" className="w-[20px] h-[23px] object-contain shrink-0" />
                                <span className="text-[18px] font-semibold text-[#1D1D1D] font-outfit">
                                    Choose a campaign or organization
                                </span>
                            </div>

                            {/* الخطوة 3 */}
                            <div className="flex items-center gap-4">
                                <img src={checkIcon} alt="check" className="w-[20px] h-[23px] object-contain shrink-0" />
                                <span className="text-[18px] font-semibold text-[#1D1D1D] font-outfit">
                                    Participate and make an impact
                                </span>
                            </div>

                        </div>

                        {/* 4. زر Get Started */}
                        <button className="bg-[#0A3A45] text-white px-10 py-4 rounded-[24px] font-bold font-outfit text-[16px] ml-[40px] hover:bg-[#0d4a57] transition-all shadow-md">
                            Get Started
                        </button>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default HowItWorks