import { useState } from 'react'

const StepTwo = ({ formData, setFormData, onNext }) => {
    const [error, setError] = useState('')

    const validate = () => {
        if (!formData.verifyCode.trim()) {
            setError('Verification code is required')
            return false
        }
        setError('')
        return true
    }

    const handleContinue = () => {
        if (validate()) onNext()
    }

    return (
        <div className="flex flex-col items-center">

            {/* العنوان */}
            <h1 className="text-[40px] font-medium font-poppins text-[#0A3A45] mb-2">Create an account</h1>
            <p className="text-[16px] text-[#5C6B73] font-poppins mb-6">
                Already have one? <span className="text-[#FFC107] cursor-pointer font-normal underline">Sign in</span>
            </p>

            {/* الـ Stepper */}
            <div className="flex items-center justify-center gap-4 mb-8 w-full">
                {[
                    { num: 1, label: 'Enter your info' },
                    { num: 2, label: 'Provide your verify code' },
                    { num: 3, label: 'Create your password' }
                ].map((step, index) => (
                    <div key={step.num} className="flex items-center gap-4">
                        <div className="flex flex-col items-center gap-1">
                            <div className={`w-[28px] h-[28px] rounded-full flex items-center justify-center text-[13px] font-bold
                                ${step.num <= 2 ? 'bg-[#FFC107] text-[#0A3A45]' : 'bg-[#0A3A45] text-white'}`}>
                                {step.num}
                            </div>
                            <span className="text-[11px] text-[#5C6B73] font-outfit">{step.label}</span>
                        </div>
                        {index < 2 && <div className="w-[150px] h-[1px] bg-[#FFC107] opacity-50 mb-4"></div>}
                    </div>
                ))}
            </div>

            {/* النص التوضيحي */}
            <p className="text-[14px] text-[#0A3A45] font-poppins text-left self-start mb-12">
                We've sent a verification code to your email.<br />
                Please check your inbox and enter the code below to complete the verification.
            </p>

            {/* حقل الكود */}
            <div className="w-full mb-6">
                <input
                    type="text"
                    placeholder="Enter your verification code"
                    value={formData.verifyCode}
                    onChange={(e) => setFormData({ ...formData, verifyCode: e.target.value })}
                    className={`w-full px-4 py-3 rounded-[12px] border-2 outline-none font-outfit text-[14px] bg-[#F7F9FA]
                        ${error ? 'border-[#EE1D52]' : 'border-[#FFC107]'}`}
                />
                {error && <p className="text-red-500 text-[12px] mt-1">{error}</p>}
            </div>

            {/* الزر */}
            <button
                onClick={handleContinue}
                className="w-full py-4 bg-[#0A3A45] text-[#F7F9FA] text-[16px] font-semibold font-inter rounded-[16px] hover:opacity-90 transition-opacity mb-4">
                Continue
            </button>

            {/* Resend */}
            <p className="text-[14px] text-[#0A3A45F0] font-inter text-center">
                Didn't get the code?{' '}
                <span className="text-[#0A3A45] cursor-pointer font-semibold">Resend</span>
            </p>

        </div>
    )
}

export default StepTwo