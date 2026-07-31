

const StateSection = ({ className = "", stats = [
    { label: "Volunteers", value: "+250" },
    { label: "Successful Campaigns", value: "+100" },
    { label: "Partner Organizations", value: "+50" },
    { label: "Volunteer Hours", value: "+120" },
] }) => {
    return (
        <section className={` w-screen relative bg-[#0A3A45] rounded-b-[40px] sm:rounded-b-[60px] min-w-full self-start left-[50%] right-[50%] ml-[-50vw] mr-[-50vw]
            h-auto min-h-[420px] sm:min-h-[380px] md:h-[350px]
            pt-10 sm:pt-[80px] md:pt-[150px] pb-10 sm:pb-16 md:pb-20
       
        ${className}`}>
            <div className="max-w-[1197px] mx-auto px-4">
                <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-between items-center gap-y-8 gap-x-4 sm:gap-8 md:gap-10">
                    {stats.map((stat) => (
                        <div key={stat.label} className="w-full md:w-[260px] flex flex-col items-center justify-center text-center">
                            <h3 className="text-[32px] sm:text-[44px] md:text-[64px] font-bold font-outfit leading-tight md:leading-[60px] text-[#FFFFFF]">{stat.value}</h3>
                            <div className="w-[40px] sm:w-[50px] md:w-[60px] h-[3px] md:h-[4px] bg-[#FFC107] mt-2 rounded-full"></div>
                            <p className="text-[13px] sm:text-[15px] md:text-[18px] font-inter mt-3 md:mt-4 text-gray-200">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

        </section >
    )
}

export default StateSection