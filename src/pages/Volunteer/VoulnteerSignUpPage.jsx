import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import arrowBack from '../../images/Icons/arrow.png'
import StepOne from '../../components/Volunteer/Auth/StepOne'
import StepTwo from '../../components/Volunteer/Auth/StepTwo'
import StepThree from '../../components/Volunteer/Auth/StepThree'

const VolunteerSignUpPage = () => {
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState('')
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        verifyCode: '',
        password: '',
        confirmPassword: ''
    })

    const nextStep = () => setCurrentStep(prev => prev + 1)
    const prevStep = () => setCurrentStep(prev => prev - 1)


    const handleRegister = async () => {
        setLoading(true)
        setApiError('')
        try {
            const response = await api.post('/volunteer/register', {
                full_name: formData.fullName,
                email: formData.email
            })
            localStorage.setItem('temp_token', response.data.access_token)
            nextStep()
        } catch (error) {
            setApiError(error.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }
    const handleVerify = async () => {
        setLoading(true)
        setApiError('')
        try {
            const tempToken = localStorage.getItem('temp_token')
            await api.post('/volunteer/verify-code', {
                email: formData.email,
                code: formData.verifyCode
            },
                {
                    headers: { Authorization: `Bearer ${tempToken}` }
                }
            )
            nextStep()
        } catch (error) {
            setApiError(error.response?.data?.message || 'Invalid code')
        } finally {
            setLoading(false)
        }
    }
    const handleSetupPassword = async () => {
        setLoading(true)
        setApiError('')
        try {
            const tempToken = localStorage.getItem('temp_token')
            await api.post('/volunteer/setup-password', {
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.confirmPassword
            },
                {
                    headers: { Authorization: `Bearer ${tempToken}` }
                }
            )
            localStorage.removeItem('temp_token')
            setShowSuccessPopup(true)
        } catch (error) {
            setApiError(error.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }
    const renderStep = () => {
        switch (currentStep) {
            case 1: return <StepOne formData={formData} setFormData={setFormData} onNext={handleRegister} loading={loading} apiError={apiError} />
            case 2: return <StepTwo formData={formData} setFormData={setFormData} onNext={handleVerify} loading={loading} apiError={apiError} />
            case 3: return <StepThree formData={formData} setFormData={setFormData} onNext={handleSetupPassword} loading={loading} apiError={apiError} />
            default: return <StepOne formData={formData} setFormData={setFormData} onNext={nextStep} />
        }
    }

    return (
        <div className="w-full min-h-screen bg-[#0A3A45] flex flex-col items-center justify-center relative overflow-hidden py-[60px]">

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
            <div className="bg-[#F7F9FA] rounded-[56px] max-w-[850px] h-[600px] px-[80px] py-[50px] z-10">
                {renderStep()}
            </div>
            {/* Popup النجاح */}
            {showSuccessPopup && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-[#0A3A45] rounded-[32px] p-[50px] max-w-[500px] text-center flex flex-col items-center gap-6">
                        <h2 className="text-[28px] font-bold font-poppins text-[#FFFFFF]">
                            Account Created Successfully!
                        </h2>
                        <p className="text-[16px] text-[#FFFFFF] font-poppins">
                            Please complete your personal information to continue.
                        </p>
                        <button
                            onClick={() => navigate('/volunteer-profile')}
                            className="w-full py-3 border-2 border-[#FFC107] text-[#FFC107] px-5 py-1.5 rounded-[10px] font-bold hover:bg-[#FFC107] hover:text-[#0A3A45] transition-all cursor-pointer text-[16px] font-semibold font-inter rounded-[16px] hover:opacity-90 transition-opacity">
                            Continue
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default VolunteerSignUpPage