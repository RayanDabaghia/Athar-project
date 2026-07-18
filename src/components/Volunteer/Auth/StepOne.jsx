import { useState } from 'react'

const StepOne = ({ formData, setFormData, onNext, loading, apiError }) => {
    const [errors, setErrors] = useState({ fullName: '', email: '' })

    const validate = () => {
        let valid = true
        let newErrors = { fullName: '', email: '' }

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required'
            valid = false
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
            valid = false
        }

        setErrors(newErrors)
        return valid
    }

    const handleContinue = () => {
        if (validate()) onNext()
    }

    return (
        <div className="flex flex-col items-center   h-full justify-between">

            {/* العنوان */}
            <h1 className="text-[40px] font-medium font-poppins text-[#0A3A45]  mb-2">Create an account</h1>
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
                                ${step.num === 1 ? 'bg-[#FFC107] text-[#0A3A45]' : 'bg-[#0A3A45] text-white'}`}>
                                {step.num}
                            </div>
                            <span className="text-[11px] text-[#5C6B73] font-outfit">{step.label}</span>
                        </div>
                        {index < 2 && <div className="w-[150px] h-[1px] bg-[#0A3A45] opacity-30 mb-4"></div>}
                    </div>
                ))}
            </div>

            {/* الحقول */}
            <div className="w-full flex flex-col gap-4 mb-6 ">

                <div className="w-full">
                    <label className="text-[14px] font-normal text-[#0A3A45F0] font-poppins mb-1 block">
                        What's your full name? <span className="#EE1D52]">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full px-4 py-3 rounded-[12px] border-2 border-[#FFC107] outline-none font-outfit text-[14px] bg-[#F7F9FA]
                            ${errors.fullName ? 'border-[#EE1D52]' : 'border-[#FFC107]'} `}
                    />
                    {errors.fullName && <p className="text-red-500 text-[12px] mt-1">{errors.fullName}</p>}
                </div>

                <div className="w-full">
                    <label className="text-[14px] font-normal text-[#0A3A45F0] font-poppins mb-1 block">
                        What's your email? <span className="text-[#EE1D52]">*</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-[12px] border-2 outline-none font-outfit text-[14px] bg-[#F7F9FA]
                            ${errors.email ? 'border-[#EE1D52]' : 'border-[#FFC107]'} focus:border-[#0A3A45]`}
                    />
                    {errors.email && <p className="text-red-500 text-[12px] mt-1">{errors.email}</p>}
                </div>

            </div>
            {apiError && <p className="text-red-500 text-[12px] mb-2 text-center">{apiError}</p>}

            {/* الزر */}
            <button
                onClick={handleContinue}
                disabled={loading}
                className="w-full py-4 bg-[#0A3A45] text-[#F7F9FA] text-[16px] font-semibold font-inter rounded-[16px] hover:opacity-90 transition-opacity mb-4">
                {loading ? 'Creating account...' : 'Continue'}
            </button>

            {/* Terms */}
            <p className="text-[12px] text-[#06272F] font-outfit text-center">
                By creating an account, you agree to our{' '}
                <span className="text-[#FFC107] cursor-pointer">Terms of use</span>{' '}
                and{' '}
                <span className="text-[#FFC107] cursor-pointer">Privacy Policy</span>
            </p>

        </div>
    )
}

export default StepOne