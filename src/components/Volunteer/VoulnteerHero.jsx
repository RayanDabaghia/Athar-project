import heroImg from '../../images/YellowBackground.png'
import searchIcon from '../../images/Icons/Search.png'
const VolunteerHero = ({ volunteerName = "Ahmad" }) => {
    return (
        <div className="mx-auto mt-6 rounded-[56px] overflow-hidden relative w-[1318px] h-[278px] max-w-[calc(100vw-80px)] mb-10"
            style={{ width: '1318px', height: '278px' }}>

            {/* الخلفية */}
            <img src={heroImg} alt="hero" className="w-full h-full object-cover absolute top-0 left-0" />

            {/* النص فوق الخلفية */}
            <div className="relative z-10 flex flex-col gap-2  h-full justify-center pt-[10px] pl-[150px]">
                <p className="text-[#06272F] text-[16px] font-medium font-outfit ">Welcome Back!</p>
                <h1 className="text-[#06272F] text-[48px] font-normal font-adlam">{volunteerName}</h1>
                <p className="text-[#06272F] text-[16px] font-outfit font-medium leading-[100%]">
                    Every Small Action Leaves A Big Impact,<br />
                    Let's Create A Better Together.
                </p>
                <button className="mt-2 bg-[#0A3A45] text-white px-6 py-3 rounded-[26px] text-[14px] font-outfit flex items-center gap-2 w-fit shadow-[0_6px_6px_0_rgba(0,0,0,0.4)]">
                    <img src={searchIcon} alt="search" className="w-[19px] h-[20px] " />
                    Explore campaigns
                </button>
            </div>

        </div>
    )
}

export default VolunteerHero