import achievementsImg from '../../images/Achievements.png'

const KeepGoing = () => {
    return (
        <div className="bg-white rounded-[56px] p-8 w-[295px] flex flex-col"
            style={{
                boxShadow: '0px 8px 4px 0px rgba(0,0,0,0.25)',

            }}>

            {/* العنوان */}
            <div className="mb-4">
                <h3 className="text-[20px] font-normal text-[#06272F] font-adlam">keep going!</h3>
                <div className="w-[40px] h-[3px] bg-[#FFC107] rounded-full mt-1"></div>
            </div>

            {/* النص */}
            <p className="text-[18px] font-medium text-[#06272F] font-outfit leading-[30px]  mb-6">
                You Are Making A Real Diffirence .<br />
                Let's Reach More Milestones Together.
            </p>

            {/* الزر */}
            <button className="bg-[#0A3A45] text-white text-[14px] px-6 py-3 rounded-[26px] font-outfit font-bold w-fit mb-6 mx-auto"
                style={{ boxShadow: '0px 6px 6px 0px rgba(0,0,0,0.4)' }}>
                View Achievements
            </button>

            {/* الصورة */}
            <div className="flex justify-center mt-auto">
                <img src={achievementsImg} alt="achievements" className="w-[180px]" />
            </div>

        </div>
    )
}

export default KeepGoing