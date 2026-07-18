import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import arrowBack from '../../images/Icons/arrow.png'
import OrgStepOne from '../../components/Organization/Auth/OrgStepOne'
import OrgStepTwo from '../../components/Organization/Auth/OrgStepTwo'
import OrgStepThree from '../../components/Organization/Auth/OrgStepThree'
import OrgSuccess from '../../components/Organization/Auth/OrgSuccess'

const STORAGE_KEY = 'org_signup'

const defaultFormData = {
    orgName: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    password: '',
    documents: []
}

const OrgSignUpPage = () => {
    const navigate = useNavigate()

    // ← نقرأ من localStorage أول، وإذا ما في شي نبدأ من الخطوة 1
    const [currentStep, setCurrentStep] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved ? JSON.parse(saved).step : 1
    })

    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved ? JSON.parse(saved).formData : defaultFormData
    })
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState('')
    const nextStep = () => setCurrentStep(prev => prev + 1)
    const prevStep = () => setCurrentStep(prev => prev - 1)
    const handleRegister = async () => {
        setLoading(true)
        setApiError('')
        try {
            const data = new FormData()
            data.append('org_name', formData.orgName)
            data.append('official_email', formData.email)
            data.append('phone_number', formData.phone)
            data.append('address', formData.address)
            data.append('org_description', formData.description)
            data.append('password', formData.password)

            formData.documents.forEach((file) => {
                data.append('document[]', file)
            })

            await api.post('/organization/register', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            localStorage.removeItem(STORAGE_KEY)
            nextStep()
        } catch (error) {
            setApiError(error.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }
    // ← كل ما تتغير الخطوة أو البيانات، نحفظهم
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            step: currentStep,
            formData: { ...formData, documents: [] } // الملفات ما تنحفظ بـ localStorage
        }))
    }, [currentStep, formData])

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <OrgStepOne formData={formData} setFormData={setFormData} onNext={nextStep} />
            case 2: return <OrgStepTwo formData={formData} setFormData={setFormData} onNext={nextStep} />
            case 3: return <OrgStepThree formData={formData} setFormData={setFormData} onNext={handleRegister} loading={loading} apiError={apiError} />
            case 4: return <OrgSuccess />
            default: return <OrgStepOne formData={formData} setFormData={setFormData} onNext={nextStep} />
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
                onClick={() => {
                    if (currentStep === 1) navigate(-1)

                    else prevStep()
                }}
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
            <div className='bg-[#F7F9FA] rounded-[56px] w-full px-[180px] py-[50px] z-10 max-w-[950px] h-[600px] flex flex-col justify-center'>
                {renderStep()}
            </div>

        </div>
    )
}

export default OrgSignUpPage