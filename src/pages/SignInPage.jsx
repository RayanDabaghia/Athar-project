import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AtharImage from '../images/Icons/SignIn.png'
import eyeOpen from '../images/Icons/open-eye.png'
import eyeClose from '../images/Icons/eye-slash.png'
const SignInPage = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState('')

    const validate = () => {
        let valid = true
        let newErrors = { email: '', password: '' }
        if (!formData.email.trim()) { newErrors.email = 'Email is required'; valid = false }
        if (!formData.password.trim()) { newErrors.password = 'Password is required'; valid = false }
        setErrors(newErrors)
        return valid
    }

    const handleSubmit = async () => {
        if (!validate()) return
        setLoading(true)
        setApiError('')
        try {
            const response = await fetch('https://athar.mohamadbelalsheshman.com/api/volunteer/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, password: formData.password })
            })
            if (response.ok) {
                const data = await response.json()
                localStorage.setItem('token', data.token)
                navigate('/')
            } else if (response.status === 403) {
                setApiError('Your account is not activated, please check your email')
            } else if (response.status === 401) {
                setApiError('Invalid email or password')
            }
        } catch {
            setApiError('Something went wrong, please try again')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full min-h-screen bg-[#0A3A45] flex items-center justify-center relative overflow-hidden p-[60px]">
            <div className="w-full min-h-screen flex mx-auto">

                {/* الصورة - يسار */}
                <div className="w-[55%] h-full rounded-l-[56px] overflow-hidden flex-shrink-0">
                    <img src={AtharImage} alt="sign in" className="w-full h-full object-cover" />
                </div>

                {/* الكارد - يمين */}
                <div className="w-[50%] min-h-[400px] bg-[#F7F9FA] rounded-[56px] flex flex-col justify-center px-[60px] -ml-[5%] z-10 shadow-xl flex-shrink-0 gap-4">

                    {/* العنوان */}
                    <h1 className="text-[48px] font-bold font-poppins text-[#0A3A45] mb-2">
                        Welcome Back !
                    </h1>
                    <p className="text-[16px] text-[#5C6B73] font-poppins mb-8">
                        Please Enter Your Email & Password
                    </p>

                    {/* الحقول */}
                    <div className="flex flex-col gap-4 mb-6">

                        {/* الإيميل */}
                        <div>
                            <label className="text-[14px] font-normal text-[#0A3A45] font-poppins mb-1 block">
                                What's your email? <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className={`w-full px-4 py-3 rounded-[12px] border outline-none font-outfit text-[14px] bg-[#F7F9FA]
                    ${errors.email ? 'border-[#EE1D52]' : 'border-[#FFC107]'}`}
                            />
                            {errors.email && <p className="text-red-500 text-[12px] mt-1">{errors.email}</p>}
                        </div>

                        {/* الباسورد */}
                        <div>
                            <label className="text-[14px] font-normal text-[#0A3A45] font-poppins mb-1 block">
                                What's your password? <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className={`w-full px-4 py-3 rounded-[12px] border outline-none font-outfit text-[14px] bg-[#F7F9FA]
                        ${errors.password ? 'border-[#EE1D52]' : 'border-[#FFC107]'}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    <img src={showPassword ? eyeClose : eyeOpen} alt="toggle password" className="w-5 h-5" />
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-[12px] mt-1">{errors.password}</p>}
                            <p
                                onClick={() => navigate('/forgot-password')}
                                className="text-[12px] text-[#5C6B73] font-poppins text-right mt-1 cursor-pointer">
                                Forgot your password ?
                            </p>
                        </div>

                    </div>
                    {/* رسالة الخطأ */}
                    {apiError && <p className="text-red-500 text-[12px] mb-2 text-center">{apiError}</p>}
                    {/* زر الدخول */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full py-3 bg-[#0A3A45] text-[#F7F9FA] text-[16px] font-semibold font-inter rounded-[16px] hover:opacity-90 transition-opacity mb-8 flex items-center justify-center gap-4"
                    >
                        Log in →
                    </button>

                    {/* Don't have an account */}
                    <div className="flex items-center justify-between">
                        <p className="text-[14px] text-[#5C6B73] font-poppins">Don't Have An Account ?</p>
                        <p
                            onClick={() => navigate('/select-role')}
                            className="text-[14px] text-[#0A3A45F0] font-poppins cursor-pointer"
                        >
                            Create Account
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SignInPage