import { useState } from 'react'

const OrgStepOne = ({ formData, setFormData, onNext }) => {
    const [errors, setErrors] = useState({ orgName: '', email: '', phone: '' })

    const validate = () => {
        let valid = true
        let newErrors = { orgName: '', email: '', phone: '' }

        if (!formData.orgName.trim()) {
            newErrors.orgName = 'Organization name is required'
            valid = false
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
            valid = false
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required'
            valid = false
        }

        setErrors(newErrors)
        return valid
    }

    const handleContinue = () => {
        if (validate()) onNext()
    }

    return (
        <div className="flex flex-col items-center">

            {/* العنوان */}
            <h1 className="text-[40px] font-medium font-poppins text-[#0A3A45] mb-2">Create an org account</h1>
            <p className="text-[16px] text-[#5C6B73] font-poppins mb-8 text-center">
                Organization accounts require admin approval before activation.
            </p>

            {/* الحقول */}
            <div className="w-full flex flex-col gap-4 mb-6">

                <div className="w-full">
                    <label className="text-[14px] font-normal text-[#0A3A45] font-poppins mb-1 block">
                        What's your organization name? <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your organization name"
                        value={formData.orgName}
                        onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                        className={`w-full px-4 py-3 rounded-[12px] border-2 outline-none font-outfit text-[14px] bg-[#F7F9FA]
                            ${errors.orgName ? 'border-[#EE1D52]' : 'border-[#FFC107]'}`}
                    />
                    {errors.orgName && <p className="text-red-500 text-[12px] mt-1">{errors.orgName}</p>}
                </div>

                <div className="w-full">
                    <label className="text-[14px] font-normal text-[#0A3A45] font-poppins mb-1 block">
                        What's your official email? <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your official email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-[12px] border-2 outline-none font-outfit text-[14px] bg-[#F7F9FA]
                            ${errors.email ? 'border-[#EE1D52]' : 'border-[#FFC107]'}`}
                    />
                    {errors.email && <p className="text-red-500 text-[12px] mt-1">{errors.email}</p>}
                </div>

                <div className="w-full">
                    <label className="text-[14px] font-normal text-[#0A3A45] font-poppins mb-1 block">
                        What's your phone number? <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-4 py-3 rounded-[12px] border-2 outline-none font-outfit text-[14px] bg-[#F7F9FA]
                            ${errors.phone ? 'border-[#EE1D52]' : 'border-[#FFC107]'}`}
                    />
                    {errors.phone && <p className="text-red-500 text-[12px] mt-1">{errors.phone}</p>}
                </div>

            </div>

            {/* الزر */}
            <button
                onClick={handleContinue}
                className="w-[600px] py-4 bg-[#0A3A45] text-[#F7F9FA] text-[16px] font-semibold font-inter rounded-[16px] hover:opacity-90 transition-opacity mb-4">
                Continue
            </button>

            {/* Terms */}
            <p className="text-[12px] text-[#06272F] font-outfit text-center">
                By creating an account, you agree to our{' '}
                <span className="text-[#FFC107] cursor-pointer underline">Terms of use</span>{' '}
                and{' '}
                <span className="text-[#FFC107] cursor-pointer underline">Privacy Policy</span>
            </p>

        </div>
    )
}

export default OrgStepOne