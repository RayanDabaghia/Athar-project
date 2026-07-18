import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'
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
            const response = await axios.post(
                '/volunteer/login',
                { email: formData.email, password: formData.password }
            )

            const data = response.data
            localStorage.setItem('token', data.access_token)
            localStorage.setItem('user', JSON.stringify(data.user))

            navigate('/volunteer')

        } catch (error) {
            if (error.response) {
                if (error.response.status === 403) {
                    setApiError('Your account is not activated, please check your email')
                } else if (error.response.status === 401) {
                    setApiError('Invalid email or password')
                } else {
                    setApiError('Something went wrong, please try again')
                }
            } else {
                setApiError('Something went wrong, please try again')
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
          font-poppins
          sm:px-10
          lg:px-12
          py-8
          lg:min-h-[520px]
          flex
          flex-col
          justify-center
        "
      >
        <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-medium text-[#0A3A45] mb-2">
          Welcome Back !
        </h1>

        <p className="text-sm sm:text-base text-[#5C6B73] mb-8">
          Please Enter Your Email & Password
        </p>

        <div className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#0A3A45] mb-2">
              What's your email? <span className="text-red-500">*</span>
            </label>

            <input
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className={`w-full h-12 rounded-xl border bg-white px-4 outline-none transition
              ${
                errors.email
                  ? "border-red-500"
                  : "border-[#FFC107] focus:border-[#0A3A45]"
              }`}
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#0A3A45] mb-2">
              What's your password? <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                className={`w-full h-12 rounded-xl border bg-white px-4 pr-12 outline-none transition
                ${
                  errors.password
                    ? "border-red-500"
                    : "border-[#FFC107] focus:border-[#0A3A45]"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <img
                  src={showPassword ? eyeClose : eyeOpen}
                  alt="Toggle Password"
                  className="w-5 h-5"
                />
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password}
              </p>
            )}

            <p
              onClick={() => navigate("/forgot-password")}
              className="mt-2 text-xs text-right text-[#5C6B73] hover:text-[#0A3A45] cursor-pointer"
            >
              Forgot your password?
            </p>
          </div>
        </div>

        {apiError && (
          <p className="text-red-500 text-sm text-center mt-5">
            {apiError}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-8 h-12 rounded-xl bg-[#0A3A45] hover:bg-[#114b57] transition text-white font-semibold disabled:opacity-70"
        >
          {loading ? "Loading..." : "Log in →"}
        </button>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-8 text-sm">
          <p className="text-[#5C6B73]">
            Don't Have An Account?
          </p>

          <button
            onClick={() => navigate("/select-role")}
            className="text-[#0A3A45] font-semibold hover:underline"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  </div>
);
}

export default SignInPage