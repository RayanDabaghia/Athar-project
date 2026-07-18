import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import arrowBack from '../images/Icons/arrow.png'
import eyeOpen from '../images/Icons/open-eye.png'
import eyeClose from '../images/Icons/eye-slash.png'
//الخطوة الأولى
const StepOne = ({ onNext, email, setEmail, loading, apiError }) => {
    const [error, setError] = useState('')

    const handleSend = async () => {
        if (!email.trim()) {
            setError('Email is required')
            return
        }
        setError('')
        onNext()
    }

    return (
        <div className="flex flex-col items-center text-center  h-full justify-between">

            <h1 className="text-[40px] font-medium font-poppins text-[#0A3A45] mb-2">
                Forgot your password ?
            </h1>
            <p className="text-[16px] text-[#5C6B73] font-poppins mb-8">
                Please enter your email address. A verification code will be <br />
                sent to allow you to change your password.
            </p>

            <div className="w-full text-left mb-6">
                <label className="text-[14px] font-normal text-[#0A3A45] font-poppins mb-1 block">
                    What's your email?
                </label>
                <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError('') }}
                    className={`w-full px-4 py-3 rounded-[12px] border-2 outline-none font-outfit text-[14px] bg-[#F7F9FA]
                        ${error ? 'border-[#EE1D52]' : 'border-[#FFC107]'}`}
                />
                {error && <p className="text-red-500 text-[12px] mt-1">{error}</p>}
            </div>
            {apiError && <p className="text-red-500 text-[12px] mb-2">{apiError}</p>}
            <button
                onClick={handleSend}
                disabled={loading}
                className="w-full py-3 bg-[#0A3A45] text-[#F7F9FA] text-[16px] font-semibold font-inter rounded-[10px] hover:opacity-90 transition-opacity"
            >
                {loading ? 'Sending...' : 'Send Code'}
            </button>

        </div>
    )
}
// الخطوة الثانية
const StepTwo = ({ onNext, code, setCode, loading, apiError }) => {
    const [error, setError] = useState('')

    const handleContinue = () => {
        if (!code.trim()) {
            setError('Verification code is required')
            return
        }
        setError('')
        onNext()
    }

    return (
        <div className="flex-col items-center text-center  h-full justify-between">

            <h1 className="text-[40px] font-medium font-poppins text-[#0A3A45] mb-6">
                Forgot your password ?
            </h1>
            <p className="text-[16px] text-[#5C6B73] font-poppins mb-20">
                Please check your email for the code.
            </p>

            <div className="w-full mb-20">
                <input
                    type="text"
                    placeholder="Enter your verification code"
                    value={code}
                    onChange={(e) => { setCode(e.target.value); setError('') }}
                    className={`w-full px-4 py-3 rounded-[12px] border-2 outline-none font-outfit text-[14px] bg-[#F7F9FA]
                        ${error ? 'border-[#EE1D52]' : 'border-[#FFC107]'}`}
                />
                {error && <p className="text-red-500 text-[12px] mt-1 text-left">{error}</p>}
            </div>
            {apiError && <p className="text-red-500 text-[12px] mb-2">{apiError}</p>}
            <button
                onClick={handleContinue}
                disabled={loading}
                className="w-full py-3 bg-[#0A3A45] text-[#F7F9FA] text-[16px] font-semibold font-inter rounded-[10px] hover:opacity-90 transition-opacity mb-4"
            >
                {loading ? 'Verifying...' : 'Continue'}
            </button>

            <p className="text-[14px] text-[#5C6B73] font-poppins">
                Didn't get the code?{' '}
                <span className="font-bold cursor-pointer text-[#0A3A45]">Resend</span>
            </p>

        </div>
    )
}
// ── الخطوة الثالثة ──
const StepThree = ({ onNext, loading, apiError }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [formData, setFormData] = useState({ password: '', confirm: '' })
    const [errors, setErrors] = useState({ password: '', confirm: '' })

    const validate = () => {
        let valid = true
        let newErrors = { password: '', confirm: '' }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required'
            valid = false
        }
        if (!formData.confirm.trim()) {
            newErrors.confirm = 'Please confirm your password'
            valid = false
        }
        if (formData.password && formData.confirm && formData.password !== formData.confirm) {
            newErrors.confirm = 'Passwords do not match'
            valid = false
        }

        setErrors(newErrors)
        return valid
    }

    const handleSave = () => {
        if (!validate()) return
        onNext(formData.password, formData.confirm)
    }

    return (
        <div className=" flex-col items-center text-center  h-full justify-between">

            <h1 className="text-[40px] font-medium font-poppins text-[#0A3A45] mb-2">
                Reset your password ?
            </h1>
            <p className="text-[16px] text-[#5C6B73] font-poppins mb-8">
                create a new password for your account.
            </p>

            <div className="w-full flex flex-col gap-10 mb-12">

                {/* الباسورد الجديد */}
                <div className="w-full text-left">
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your new password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className={`w-full px-4 py-3 rounded-[12px] border-2 outline-none font-outfit text-[14px] bg-[#F7F9FA]
                                ${errors.password ? 'border-[#EE1D52]' : 'border-[#FFC107]'}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C6B73]"
                        >
                            <img src={showPassword ? eyeClose : eyeOpen} alt="toggle" className="w-5 h-5" />
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-[12px] mt-1">{errors.password}</p>}
                    <p className="text-[12px] text-[#5C6B73] font-outfit mt-1">
                        Use 8 or more characters, numbers, symbols
                    </p>
                </div>

                {/* تأكيد الباسورد */}
                <div className="w-full text-left">
                    <div className="relative">
                        <input
                            type={showConfirm ? 'text' : 'password'}
                            placeholder="Re-enter your new password"
                            value={formData.confirm}
                            onChange={(e) => setFormData({ ...formData, confirm: e.target.value })}
                            className={`w-full px-4 py-3 rounded-[12px] border-2 outline-none font-outfit text-[14px] bg-[#F7F9FA]
                                ${errors.confirm ? 'border-[#EE1D52]' : 'border-[#FFC107]'}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C6B73]"
                        >
                            <img src={showConfirm ? eyeClose : eyeOpen} alt="toggle" className="w-5 h-5" />
                        </button>
                    </div>
                    {errors.confirm && <p className="text-red-500 text-[12px] mt-1">{errors.confirm}</p>}
                </div>

            </div>
            {apiError && <p className="text-red-500 text-[12px] mb-2">{apiError}</p>}
            <button
                onClick={handleSave}
                disabled={loading}
                className="w-full py-3 bg-[#0A3A45] text-[#F7F9FA] text-[16px] font-semibold font-inter rounded-[10px] hover:opacity-90 transition-opacity"
            >
                {loading ? 'Saving...' : 'Save'}
            </button>

        </div>
    )
}
const ForgotPasswordPage = () => {
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(1)
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState('')

    const nextStep = () => setCurrentStep(prev => prev + 1)
    const prevStep = () => setCurrentStep(prev => prev - 1)
    const handleSendCode = async () => {
        setLoading(true)
        setApiError('')
        try {
            await api.post('/volunteer/forgot-password', { email })
            nextStep()
        } catch (error) {
            setApiError(error.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyCode = async () => {
        setLoading(true)
        setApiError('')
        try {
            await api.post('/volunteer/verify-reset-code', { email, code })
            nextStep()
        } catch (error) {
            setApiError(error.response?.data?.message || 'Invalid code')
        } finally {
            setLoading(false)
        }
    }

    const handleResetPassword = async (password, confirmPassword) => {
        setLoading(true)
        setApiError('')
        try {
            await api.post('/volunteer/reset-password', {
                email,
                code,
                password,
                password_confirmation: confirmPassword
            })
            navigate('/signin')
        } catch (error) {
            setApiError(error.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }
    const renderStep = () => {
        switch (currentStep) {
            case 1: return <StepOne onNext={handleSendCode} email={email} setEmail={setEmail} loading={loading} apiError={apiError} />
            case 2: return <StepTwo onNext={handleVerifyCode} code={code} setCode={setCode} loading={loading} apiError={apiError} />
            case 3: return <StepThree onNext={handleResetPassword} loading={loading} apiError={apiError} />
            default: return null
        }
    }

    return (
        <div className="w-full min-h-screen bg-[#0A3A45] flex flex-col items-center justify-center relative overflow-hidden py-[40px]">

            {/* سهم الرجوع */}
            <img
                src={arrowBack}
                alt="back"
                className="absolute top-[40px] left-[40px] w-[38px] h-[33px] cursor-pointer z-10"
                style={{ filter: 'invert(1)' }}
                onClick={() => currentStep === 1 ? navigate(-1) : prevStep()}
            />

            {/* الخطوط الجانبية اليسار */}
            <div className="absolute left-0 top-[20%] flex flex-col gap-3">
                <div className="w-[482px] h-[8px] bg-[#F7F9FA]"></div>
                <div className="w-[482px] h-[8px] bg-[#FFC107]"></div>
            </div>

            {/* الخطوط الجانبية اليمين */}
            <div className="absolute right-0 top-[80%] flex flex-col gap-3">
                <div className="w-[482px] h-[8px] bg-[#FFC107]"></div>
                <div className="w-[482px] h-[8px] bg-[#F7F9FA]"></div>
            </div>

            {/* الكارد */}
            <div className="bg-[#F7F9FA] rounded-[56px] max-w-[850px] h-[400px] px-[180px] py-[50px] z-10 max-w-[950px] min-h-[500px] flex flex-col justify-center">
                {renderStep()}
            </div>

        </div>
    )
}

export default ForgotPasswordPage