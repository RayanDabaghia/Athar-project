import { useNavigate } from 'react-router-dom'
import arrowBack from '../images/Icons/arrow.png'
const SelectRolePage = () => {
    const navigate = useNavigate()

    return (
        <div className="w-full min-h-screen bg-[#0A3A45] flex flex-col items-center justify-center relative overflow-hidden">

            {/* سهم الرجوع */}
            <img
                src={arrowBack}
                alt="back"
                className="absolute top-[40px] left-[40px] w-[38px] h-[33px] cursor-pointer hover:opacity-70 transition-opacity z-10"
                style={{ filter: 'invert(1)' }}
                onClick={() => navigate(-1)}
            />

            {/* الخطوط الجانبية اليسار */}
            <div className="absolute left-0 top-[20%]  flex flex-col gap-3">
                <div className="w-[482px] h-[8px] bg-[#F7F9FA] "></div>
                <div className="w-[482px] h-[8px] bg-[#FFC107]"></div>
            </div>

            {/* الخطوط الجانبية اليمين */}
            <div className="absolute right-0 top-[80%]  flex flex-col gap-3">
                <div className="w-[482px] h-[8px] bg-[#FFC107]"></div>
                <div className="w-[482px] h-[8px] bg-[#F7F9FA] "></div>
            </div>

            {/* الكروت */}
            <div className="flex flex-col gap-6 z-10 py-16">

                {/* Volunteer */}
                <div
                    onClick={() => navigate('/signup/volunteer')}
                    className="w-[500px] h-[260px] bg-[#F7F9FA] rounded-[56px] flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                    <h2 className="text-[60px] font-medium text-[#0A3A45] font-poppins mb-2">Volunteer</h2>
                    <div className="w-[50px] h-[3px] bg-[#FFC107] rounded-full mt-[-12px] mb-3 ml-[-200px] "></div>

                    <p className="text-[28px] text-[#0A3A45] text-center font-poppins font-light">
                        Join campaigns<br />and volunteer opportunities
                    </p>
                </div>

                {/* Organization */}
                <div
                    onClick={() => navigate('/signup/organization')}
                    className="w-[500px] h-[260px] bg-[#F7F9FA] rounded-[56px] flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                    <h2 className="text-[60px] font-medium text-[#0A3A45] font-poppins mb-2">Organization</h2>
                    <div className="w-[40px] h-[3px] bg-[#FFC107] rounded-full mt-[-12px] mb-3 ml-[-280px]"></div>
                    <p className="text-[28px] text-[#0A3A45] text-center font-poppins font-light">
                        Create campaigns<br />and manage volunteers
                    </p>
                </div>

            </div>
        </div>
    )
}

export default SelectRolePage