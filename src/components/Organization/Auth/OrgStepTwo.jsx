import { useState } from 'react'
const OrgStepTwo = ({ formData, setFormData, onNext }) => {
    const [errors, setErrors] = useState({ address: '', description: '', password: '' })

    const validate = () => {
        let valid = true
        let newErrors = { address: '', description: '', password: '' }
        if (!formData.address.trim()) {
            newErrors.address = 'Address is required'
            valid = false
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required'
            valid = false
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required'
            valid = false
        }
        setErrors(newErrors)
        return valid
    }

    const handleContinue = () => {
        if (validate()) onNext()
    }

    return (
        <div className="flex flex-col ">

            {/* العنوان */}
            <div className="text-center">
                <h1 className="text-[40px] font-medium font-poppins text-[#0A3A45] mb-2">
                    Create an org account
                </h1>
                <p className="text-[16px] text-[#5C6B73] font-poppins mb-8 text-center">
                    Organization accounts require admin approval before activation.
                </p>
            </div>

            {/* الحقول */}
            <div className="w-full flex flex-col gap-4 mb-6">

                {/* Address */}
                <div className="w-full">
                    <label className="text-[14px] font-normal text-[#0A3A45] font-poppins mb-1 block">
                        What's your address? <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="org_address"
                        autoComplete="off"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className={`w-full px-4 py-3 rounded-[12px] border-2 outline-none font-outfit text-[14px] bg-[#F7F9FA]
                            ${errors.address ? 'border-[#EE1D52]' : 'border-[#FFC107]'}`}
                    />
                    {errors.address && <p className="text-red-500 text-[12px] mt-1">{errors.address}</p>}
                </div>

                {/* Description */}
                <div className="w-full">
                    <label className="text-[14px] font-normal text-[#0A3A45] font-poppins mb-1 block">
                        What's your description? <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="org_description"
                        autoComplete="off"
                        placeholder="Enter your description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className={`w-full px-4 py-3 rounded-[12px] border-2 outline-none font-outfit text-[14px] bg-[#F7F9FA]
                             [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_#F7F9FA]
    [&:-webkit-autofill]:[-webkit-text-fill-color:#0A3A45]
                            ${errors.description ? 'border-[#EE1D52]' : 'border-[#FFC107]'}`}
                    />
                    {errors.description && <p className="text-red-500 text-[12px] mt-1">{errors.description}</p>}
                </div>

                {/* Password */}
                <div className="w-full">
                    <label className="text-[14px] font-normal text-[#0A3A45] font-poppins mb-1 block">
                        What's your password? <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        autoComplete="off"
                        name="org_password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className={`w-full px-4 py-3 rounded-[12px] border-2 outline-none font-outfit text-[14px] bg-[#F7F9FA]
                             [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_#F7F9FA]
    [&:-webkit-autofill]:[-webkit-text-fill-color:#0A3A45]
                            ${errors.password ? 'border-[#EE1D52]' : 'border-[#FFC107]'}`}
                    />
                    {errors.password && <p className="text-red-500 text-[12px] mt-1">{errors.password}</p>}
                </div>
            </div>

            {/* زر Continue */}
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

export default OrgStepTwo