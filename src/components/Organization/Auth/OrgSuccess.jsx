import { useNavigate } from 'react-router-dom'

const OrgSuccess = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center text-center  h-full justify-between">

            {/* العنوان + أيقونة */}
            <div className="flex items-center justify-center gap-3 mb-8">
                <h1 className="text-[32px] font-medium font-poppins text-[#0A3A45]">
                    Registration Request Submitted!
                </h1>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#FFC107" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            {/* النص الأول */}
            <p className="text-[16px] text-[#5C6B73] font-poppins mb-10 leading-relaxed">
                Your organization's information and verification documents <br />
                have been received successfully and are currently under review.
            </p>

            {/* النص الثاني */}
            <p className="text-[16px] text-[#5C6B73] font-poppins mb-16 leading-relaxed">
                You will receive an email once your account is approved, <br />
                Please check your email regularly for updates.
            </p>

            {/* زر الرجوع */}
            <button
                onClick={() => navigate('/')}
                className="w-[600px] py-4 bg-[#0A3A45] text-[#F7F9FA] text-[16px] font-semibold font-inter rounded-[16px] hover:opacity-90 transition-opacity mb-8"
            >
                Back to Home
            </button>

            {/* ملاحظة */}
            <p className="text-[14px] text-[#5C6B73] font-poppins ">
                Review usually takes 1–3 business days.
            </p>

        </div>
    )
}

export default OrgSuccess