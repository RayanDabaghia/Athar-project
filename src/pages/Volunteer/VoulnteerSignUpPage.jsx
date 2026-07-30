import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import api from '../../api/axios'

import arrowBack from '../../images/Icons/arrow.png'

import StepOne from '../../components/Volunteer/Auth/StepOne'
import StepTwo from '../../components/Volunteer/Auth/StepTwo'
import StepThree from '../../components/Volunteer/Auth/StepThree'

import { volunteerSignupSchema } from '../../validation/volunteerSignupSchema'


const VolunteerSignUpPage = () => {


    const navigate = useNavigate()


    const [currentStep, setCurrentStep] = useState(1)

    const [loading, setLoading] = useState(false)

    const [apiError, setApiError] = useState('')

    const [showSuccessPopup, setShowSuccessPopup] = useState(false)



    const {
        register,
        trigger,
        getValues,
        formState:{
            errors
        }

    } = useForm({

        resolver:zodResolver(volunteerSignupSchema),

        mode:"onChange",

        defaultValues:{
            fullName:"",
            email:"",
            verifyCode:"",
            password:"",
            confirmPassword:""
        }

    })




    const nextStep = () => {
        setCurrentStep(prev => prev + 1)
    }



    const prevStep = () => {
        setCurrentStep(prev => prev - 1)
    }




    const handleRegister = async () => {


        const valid = await trigger([
            "fullName",
            "email"
        ])


        if(!valid) return



        setLoading(true)

        setApiError('')


        try{


            const response = await api.post(
                '/volunteer/register',
                {
                    full_name:getValues("fullName"),
                    email:getValues("email")
                }
            )



            localStorage.setItem(
                'temp_token',
                response.data.access_token
            )


            nextStep()



        }catch(error){


            setApiError(
                error.response?.data?.message ||
                'Something went wrong'
            )


        }finally{

            setLoading(false)

        }

    }





    const handleVerify = async () => {


        const valid = await trigger([
            "verifyCode"
        ])


        if(!valid) return



        setLoading(true)

        setApiError('')



        try{


            const token =
            localStorage.getItem('temp_token')



            await api.post(
                '/volunteer/verify-code',
                {
                    email:getValues("email"),
                    code:getValues("verifyCode")
                },
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )



            nextStep()



        }catch(error){


            setApiError(
                error.response?.data?.message ||
                "Invalid code"
            )


        }finally{

            setLoading(false)

        }

    }





    const handleSetupPassword = async () => {


        const valid = await trigger([
            "password",
            "confirmPassword"
        ])



        if(!valid) return



        setLoading(true)

        setApiError('')



        try{


            const token =
            localStorage.getItem('temp_token')



            await api.post(
                '/volunteer/setup-password',
                {
                    email:getValues("email"),
                    password:getValues("password"),
                    password_confirmation:
                    getValues("confirmPassword")
                },
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )



            localStorage.removeItem(
                'temp_token'
            )



            setShowSuccessPopup(true)



        }catch(error){


            setApiError(
                error.response?.data?.message ||
                "Something went wrong"
            )


        }finally{

            setLoading(false)

        }

    }





    const renderStep = () => {


        switch(currentStep){


            case 1:

            return (
                <StepOne

                    register={register}

                    errors={errors}

                    onNext={handleRegister}

                    loading={loading}

                    apiError={apiError}

                />
            )



            case 2:

            return (
                <StepTwo

                    register={register}

                    errors={errors}

                    onNext={handleVerify}

                    loading={loading}

                    apiError={apiError}

                />
            )



            case 3:

            return (
                <StepThree

                    register={register}

                    errors={errors}

                    onNext={handleSetupPassword}

                    loading={loading}

                    apiError={apiError}

                />
            )


            default:

            return null

        }

    }





return (

<div
className="
w-full
h-screen
overflow-hidden
bg-[#0A3A45]
flex
items-center
justify-center
relative
"
>


{/* Back Arrow */}

<img

src={arrowBack}

alt="back"

className="
absolute
top-5
left-5

sm:top-10
sm:left-10

w-[32px]
h-[28px]

sm:w-[38px]
sm:h-[33px]

cursor-pointer
z-20
"

style={{
filter:'invert(1)'
}}

onClick={() =>
currentStep === 1
?
navigate(-1)
:
prevStep()
}

/>





{/* Left Lines */}

<div
className="
absolute
left-0
top-[20%]
flex
flex-col
gap-3
"
>

<div
className="
w-[35vw]
max-w-[482px]
h-[8px]
bg-[#F7F9FA]
"
/>


<div
className="
w-[35vw]
max-w-[482px]
h-[8px]
bg-[#FFC107]
"
/>


</div>







{/* Right Lines */}

<div
className="
absolute
right-0
top-[80%]
flex
flex-col
gap-3
"
>

<div
className="
w-[35vw]
max-w-[482px]
h-[8px]
bg-[#FFC107]
"
/>



<div
className="
w-[35vw]
max-w-[482px]
h-[8px]
bg-[#F7F9FA]
"
/>


</div>








{/* Card */}

<div

className="
bg-[#F7F9FA]

rounded-[56px]

w-[90%]

max-w-[850px]

min-h-[500px]

max-h-[85vh]

overflow-y-auto

px-[clamp(25px,5vw,80px)]

py-[clamp(25px,5vh,50px)]

z-10

"

>


{renderStep()}


</div>









{/* Success Popup */}

{
showSuccessPopup && (

<div

className="
fixed
inset-0
bg-black/50
backdrop-blur-sm
flex
items-center
justify-center
z-50
px-5
"

>


<div

className="
bg-[#0A3A45]

rounded-[32px]

p-8

sm:p-[50px]

max-w-[500px]

w-full

text-center

flex

flex-col

items-center

gap-6

"

>


<h2

className="
text-[22px]

sm:text-[28px]

font-bold

font-poppins

text-white
"

>

Account Created Successfully!

</h2>




<p

className="
text-[14px]

sm:text-[16px]

text-white

font-poppins

"

>

Please complete your personal information to continue.

</p>




<button

onClick={() =>
navigate('/volunteer-profile')
}

className="
w-full
py-3

border-2

border-[#FFC107]

text-[#FFC107]

rounded-[16px]

font-semibold

hover:bg-[#FFC107]

hover:text-[#0A3A45]

transition-all

"

>

Continue

</button>




</div>


</div>

)

}




</div>

)

}



export default VolunteerSignUpPage