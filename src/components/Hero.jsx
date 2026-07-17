import heroImg from '../images/Hero.png';

const Hero = () => {
    return (
        <section className="  flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-10 md:min-h-[800px] bg-white max-w-[1523px] mx-auto max-w-screen-2x">
            <div className="flex-1 min-w-max z-10 space-y-6 mt-[-226px]">
                <h1 className="font-adlam text-[70px] leading-[1.1] ">
                    <span className=" text-[#FFC107] block">Create Change</span>
                    <span className="text-[#0A3A45] whitespace-nowrap" >Leave Your Mark</span>
                </h1>
                <p className="font-inter font-normal text-[20px] leading-[1.4] max-w-[545px] text-[#5C6B73]">A platform that connects volunteer organizations with passionate people to launch meaningful campaigns and create real change in society</p>
                <button className="text-white rounded-[26px] bg-[#0A3A45] py-[18px] px-[40px] font-inter gap-[32px] ">Start Volunteering</button>
            </div>
            <div className="absolute left-[0px] top-[520px] z-0 opacity-40">
                <div className="grid grid-cols-5 gap-x-6 gap-y-4">
                    {[...Array(40)].map((_, i) => (
                        <div key={i} className="w-[6px] h-[6px] bg-[#06272F36] rounded-full"></div>
                    ))}
                </div>
            </div>
            <div className="relative w-[701px] h-[654px] flex items-center justify-center mt-[-300px] left-[40px]">
                <div className="absolute w-[400px] h-[400px] border-[1px] border-[#0A3A45] opacity-20 rounded-full left-10 top-20 z-0 pointer-events-none"></div>


                <div className="absolute w-[400px] h-[400px] border-[1px] border-[#FFC107] opacity-30 rounded-full right-5 bottom-30 z-0 pointer-events-none"></div>

                <div className="absolute w-[400px] h-[400px] bg-[#FFC107]   opacity-5 rounded-full blur-[100px] z-0 pointer-events-none"></div>
                <img
                    src={heroImg}
                    alt="Athar Illustration"
                    className="relative z-10 w-full h-full object-contain object-right "
                />
            </div>





        </section>
    )
}

export default Hero;