import { useState } from 'react'
import eyeClosedIcon from '../../../images/Icons/eye-slash.png'
import eyeOpenIcon from '../../../images/Icons/open-eye.png'
const StepThree = ({ formData, setFormData, onNext, loading, apiError }) => {
    const [errors, setErrors] = useState({ password: '', confirmPassword: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword,] = useState(false)

    const validate = () => {
        let valid = true
        let newErrors = { password: '', confirmPassword: '' }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required'
            valid = false
        } else if (formData.password.length < 8) {
            newErrors.password = 'Use 8 or more characters, numbers, symbols'
            valid = false
        }

        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Please confirm your password'
            valid = false
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
            valid = false
        }

        setErrors(newErrors)
        return valid
    }

    const handleSubmit = () => {
        if (validate())
            onNext()
        // هون رح نربط الـ API بعدين

    }

    return (
        <div className="flex flex-col items-center   h-full justify-between">

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
                                ${step.num <= 3 ? 'bg-[#FFC107] text-[#0A3A45]' : 'bg-[#0A3A45] text-white'}`}>
                                {step.num}
                            </div>
                            <span className="text-[11px] text-[#06272F] font-outfit">{step.label}</span>
                        </div>
                        {index < 2 && <div className="w-[150px] h-[1px] bg-[#FFC107] opacity-60 mb-4"></div>}
                    </div>
                ))}
            </div>

            {/* الحقول */}
            <div className="w-full flex flex-col gap-10 mb-6">

                {/* كلمة المرور */}
                <div className="w-full">
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className={`w-full px-4 py-3 rounded-[12px] border-2 outline-none font-outfit text-[14px] bg-[#F7F9FA]
                                ${errors.password ? 'border-[#EE1D52]' : 'border-[#FFC107]'}`}
                        />
                        <img
                            src={showPassword ? eyeOpenIcon : eyeClosedIcon}
                            alt="toggle password"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer w-[20px] h-[20px]"
                        />
                    </div>
                    {errors.password
                        ? <p className="text-red-500 text-[12px] mt-1">{errors.password}</p>
                        : <p className="text-[#737A796E] text-[12px] mt-1">Use 8 or more characters, numbers, symbols</p>
                    }
                </div>

                {/* تأكيد كلمة المرور */}
                <div className="w-full">
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Re-enter your password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            className={`w-full px-4 py-3 rounded-[12px] border-2 outline-none font-outfit text-[14px] bg-[#F7F9FA]
                                ${errors.confirmPassword ? 'border-[#EE1D52]' : 'border-[#FFC107]'}`}
                        />
                        <img
                            src={showPassword ? eyeOpenIcon : eyeClosedIcon}
                            alt="toggle password"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer w-[20px] h-[20px]"
                        />
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-[12px] mt-1">{errors.confirmPassword}</p>}
                </div>

            </div>
            {apiError && <p className="text-red-500 text-[12px] mb-2 text-center">{apiError}</p>}
            {/* الزر */}
            <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 bg-[#0A3A45] text-[#F7F9FA] text-[16px] font-semibold font-inter rounded-[16px] hover:opacity-90 transition-opacity">
                {loading ? 'Creating account...' : 'Get Started'}

            </button>

        </div>
    )
}

export default StepThree