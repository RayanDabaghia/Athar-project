import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import arrowBack from '../../images/Icons/arrow.png'
import StepOne from '../../components/Volunteer/Auth/StepOne'
import StepTwo from '../../components/Volunteer/Auth/StepTwo'
import StepThree from '../../components/Volunteer/Auth/StepThree'

const VolunteerSignUpPage = () => {
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        verifyCode: '',
        password: '',
        confirmPassword: ''
    })

    const nextStep = () => setCurrentStep(prev => prev + 1)
    const prevStep = () => setCurrentStep(prev => prev - 1)

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <StepOne formData={formData} setFormData={setFormData} onNext={nextStep} />
            case 2: return <StepTwo formData={formData} setFormData={setFormData} onNext={nextStep} />
            case 3: return <StepThree formData={formData} setFormData={setFormData} />
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
            <div className="bg-[#F7F9FA] rounded-[56px] max-w-[850px] px-[80px] py-[50px] z-10">
                {renderStep()}
            </div>

        </div>
    )
}

export default VolunteerSignUpPage