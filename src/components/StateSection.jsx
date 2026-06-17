

const StateSection = ({ className = "", stats = [
    { label: "Volunteers", value: "+250" },
    { label: "Successful Campaigns", value: "+100" },
    { label: "Partner Organizations", value: "+50" },
    { label: "Volunteer Hours", value: "+120" },
] }) => {
    return (
        <section className={` w-screen relative bg-[#0A3A45]  rounded-b-[60px] min-w-full self-start h-[420px] left-[50%] right-[50%] ml-[-50vw] mr-[-50vw]  pt-[150px] pb-20 ${className}`}>
            <div className="max-w-[1197px] mx-auto px-4">
                <div className="flex flex-wrap justify-center md:justify-between items-center gap-10">
                    {stats.map((stat) => (
                        <div key={stat.label} className="w-[260px] flex flex-col items-center justify-center text-center">
                            <h3 className="text-[64px] font-bold font-outfit leading-[60px] text-[#FFFFFF]">{stat.value}</h3>
                            <div className="w-[60px] h-[4px] bg-[#FFC107] mt-2 rounded-full"></div>
                            <p className="text-[18px] font-inter mt-4 text-gray-200">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

        </section >
    )
}

export default StateSection