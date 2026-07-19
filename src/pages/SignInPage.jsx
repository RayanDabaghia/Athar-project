import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import { useForm } from 'react-hook-form'

import AtharImage from '../images/Icons/SignIn.png'
import eyeOpen from '../images/Icons/open-eye.png'
import eyeClose from '../images/Icons/eye-slash.png'


const SignInPage = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState('')

    const onSubmit = async (data) => {

        setLoading(true)
        setApiError('')

        try {

            const response = await axios.post(
                '/volunteer/login',
                {
                    email: data.email,
                    password: data.password
                }
            )

            const result = response.data


            localStorage.setItem(
                'token',
                result.access_token
            )
            localStorage.setItem(
                'user',
                JSON.stringify(result.user)
            )


            navigate('/volunteer')


        } catch (error) {

            console.log(error.response)


            if (error.response) {


                if (error.response.status === 403) {

                    setApiError(
                        'Your account is not activated, please check your email'
                    )


                } else if (error.response.status === 401) {

                    setApiError(
                        'Invalid email or password'
                    )


                } else {

                    setApiError(
                        error.response.data?.message ||
                        'Something went wrong'
                    )
                }


            } else {

                setApiError(
                    'Server is not reachable'
                )

            }
        } finally {

            setLoading(false)

        }
    }

    return (

        <div className="min-h-screen bg-[#0A3A45] flex items-center justify-center p-4 sm:p-6 lg:p-10">

            <div className="w-full max-w-7xl flex items-center justify-center">


                {/* Image */}

                <div className="hidden lg:block lg:w-1/2 lg:h-[520px] overflow-hidden rounded-l-[40px]">
                    <img
                        src={AtharImage}
                        alt="Sign In"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Form */}


                <div

                    className="
                    w-full
                    max-w-[520px]
                    lg:max-w-none
                    lg:w-1/2
                    bg-[#F7F9FA]
                    rounded-[28px]
                    lg:rounded-[40px]
                    lg:-ml-11
                    shadow-2xl
                    px-6
                    sm:px-10
                    lg:px-12
                    py-8
                    lg:min-h-[520px]
                    flex
                    flex-col
                    justify-center font-poppins
                    "
                >

                    <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-medium text-[#0A3A45] mb-2">

                        Welcome Back !

                    </h1>



                    <p className="text-sm sm:text-base text-[#5C6B73] mb-8">

                        Please Enter Your Email & Password

                    </p>



                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5" noValidate
                    >



                        {/* Email */}

                        <div>


                            <label className="block text-sm font-medium text-[#0A3A45] mb-2">

                                What's your email?
                                <span className="text-red-500">*</span>

                            </label>



                            <input

                                type="email"

                                placeholder="Enter your email address"

                                {...register("email", {

                                    required:
                                    "Email is required",

                                    pattern: {

                                        value:
                                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

                                        message:
                                        "Please enter a valid email"

                                    }

                                })}

                                className={`
                                w-full
                                h-12
                                rounded-xl
                                border
                                bg-white
                                px-4
                                outline-none
                                transition

                                ${
                                    errors.email
                                    ?
                                    "border-red-500"
                                    :
                                    "border-[#FFC107] focus:border-[#0A3A45]"
                                }

                                `}
                            />
                            {
                                errors.email &&

                                <p className="text-red-500 text-xs mt-1">

                                    {errors.email.message}

                                </p>
                            }


                        </div>





                        {/* Password */}


                        <div>


                            <label className="block text-sm font-medium text-[#0A3A45] mb-2">

                                What's your password?
                                <span className="text-red-500">*</span>

                            </label>



                            <div className="relative">


                                <input


                                    type={
                                        showPassword
                                        ?
                                        "text"
                                        :
                                        "password"
                                    }


                                    placeholder="Enter your password"


                                    {...register("password", {

                                        required:
                                        "Password is required",


                                        minLength: {

                                            value:8,

                                            message:
                                            "Password must be at least 8 characters"

                                        }

                                    })}


                                    className={`

                                    w-full
                                    h-12
                                    rounded-xl
                                    border
                                    bg-white
                                    px-4
                                    pr-12
                                    outline-none
                                    transition

                                    ${
                                        errors.password

                                        ?

                                        "border-red-500"

                                        :

                                        "border-[#FFC107] focus:border-[#0A3A45]"
                                    }

                                    `}


                                />



                                <button

                                    type="button"

                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }

                                    className="
                                    absolute
                                    right-4
                                    top-1/2
                                    -translate-y-1/2
                                    "

                                >


                                    <img

                                        src={
                                            showPassword
                                            ?
                                            eyeClose
                                            :
                                            eyeOpen
                                        }

                                        alt="Toggle Password"

                                        className="w-5 h-5"

                                    />


                                </button>


                            </div>




                            {
                                errors.password &&

                                <p className="text-red-500 text-xs mt-1">

                                    {errors.password.message}

                                </p>
                            }





                            <p

                                onClick={() =>
                                    navigate("/forgot-password")
                                }

                                className="
                                mt-2
                                text-xs
                                text-right
                                text-[#5C6B73]
                                hover:text-[#0A3A45]
                                cursor-pointer
                                "

                            >

                                Forgot your password?

                            </p>



                        </div>





                        {
                            apiError &&

                            <p className="text-red-500 text-sm text-center">

                                {apiError}

                            </p>
                        }





                        <button

                            type="submit"

                            disabled={loading}

                            className="
                            w-full
                            mt-8
                            h-12
                            rounded-xl
                            bg-[#0A3A45]
                            hover:bg-[#114b57]
                            transition
                            text-white
                            font-semibold
                            disabled:opacity-70
                            "

                        >

                            {
                                loading
                                ?
                                "Loading..."
                                :
                                "Log in →"
                            }


                        </button>


                    </form>






                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-8 text-sm">


                        <p className="text-[#5C6B73]">

                            Don't Have An Account?

                        </p>



                        <button

                            onClick={() =>
                                navigate("/select-role")
                            }

                            className="
                            text-[#0A3A45]
                            font-semibold
                            hover:underline
                            "

                        >

                            Create Account

                        </button>


                    </div>



                </div>


            </div>


        </div>

    )

}


export default SignInPage