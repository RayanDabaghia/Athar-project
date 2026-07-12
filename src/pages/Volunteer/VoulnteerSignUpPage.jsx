import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import arrowBack from '../../images/Icons/arrow.png'
import StepOne from '../../components/Volunteer/Auth/StepOne'
import StepTwo from '../../components/Volunteer/Auth/StepTwo'
import StepThree from '../../components/Volunteer/Auth/StepThree'

const VolunteerSignUpPage = () => {
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState('')
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
            const response = await fetch('https://athar.mohamadbelalsheshman.com/api/volunteer/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    full_name: formData.fullName,
                    email: formData.email,
                    password: formData.password
                })
            })
            if (response.ok) {
                nextStep()
            } else {
                const data = await response.json()
                setApiError(data.message || 'Something went wrong')
            }
        } catch {
            setApiError('Something went wrong, please try again')
        } finally {
            setLoading(false)
        }
    }

    const handleVerify = async () => {
        setLoading(true)
        setApiError('')
        try {
            const response = await fetch('https://athar.mohamadbelalsheshman.com/api/volunteer/verify-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    code: formData.verifyCode
                })
            })
            if (response.ok) {
                navigate('/signin')
            } else {
                const data = await response.json()
                setApiError(data.message || 'Invalid code')
            }
        } catch {
            setApiError('Something went wrong, please try again')
        } finally {
            setLoading(false)
        }
    }
    const renderStep = () => {
        switch (currentStep) {
            case 1: return <StepOne formData={formData} setFormData={setFormData} onNext={nextStep} />
            case 2: return <StepTwo formData={formData} setFormData={setFormData} onNext={handleVerify} loading={loading} apiError={apiError} />
            case 3: return <StepThree formData={formData} setFormData={setFormData} onNext={handleRegister} loading={loading} apiError={apiError} />
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

        </div>
    )
}

export default VolunteerSignUpPage