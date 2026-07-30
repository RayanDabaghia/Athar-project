const StepTwo = ({
register,
errors,
onNext,
loading,
apiError
}) => {


return (

<div className="
flex
flex-col
items-center
w-full
gap-5
">


<h1 className="
text-[clamp(26px,4vw,40px)]
font-medium
text-[#0A3A45]
font-poppins
">
Verify your email
</h1>




<p className="
text-[#5C6B73]
text-center
font-poppins
">
We've sent a verification code to your email.
</p>




<input

{...register("verifyCode")}

placeholder="Enter verification code"

className={`
w-full
px-4
py-3
rounded-[12px]
border-2
outline-none

${errors.verifyCode
?
"border-[#EE1D52]"
:
"border-[#FFC107]"
}

`}

/>



{
errors.verifyCode &&
<p className="text-red-500 text-[12px]">
{errors.verifyCode.message}
</p>
}



{
apiError &&
<p className="text-red-500 text-sm">
{apiError}
</p>
}




<button

onClick={onNext}

disabled={loading}

className="
w-full
py-4
bg-[#0A3A45]
text-white
rounded-[16px]
"

>

{
loading
?
"Verifying..."
:
"Continue"
}


</button>


</div>

)

}


export default StepTwo