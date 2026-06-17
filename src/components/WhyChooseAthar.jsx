
import impact from "../images/impact.png"
import opportunities from "../images/opportunities.png"
import connection from "../images/connection.png"
const WhyChooseAthar = () => {
    return (
        <section className=" flex flex-col items-center  relative px-[121px] py-20 pt-5 pb-20 z-10 mt-[-200px]">
            <div className="flex flex-col text-center  ">
                <h2 className="font-adlam text-[#0A3A45] text-[40px] whitespace-nowrap inline-block relative" >Why Choose Athar?
                    <div className="absolute left-[20px] top-[60px] w-[63px] h-[4px] bg-[#FFC107] rounded-full z-0"></div>
                </h2>
            </div>
            <p className="text-[#5C6B73] text-[16px] text-center mt-[40px] max-w-[600px] font-inter whitespace-nowrap">
                A simple way to connect people who want to help with real opportunities to create impact.
            </p>
            <div className="flex flex-row justify-center items-center gap-[24px]">
                <img src={connection} alt="" className="w-[383px] h-[413px]" />
                <img src={opportunities} alt="" className="w-[383px] h-[413px]" />
                <img src={impact} alt="" className="w-[383px] h-[413px]" />
            </div>




        </section>
    )
}

export default WhyChooseAthar