const StepOne = ({
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
font-poppins
text-[#0A3A45]
mb-2
">
Create an account
</h1>



<p className="
text-[16px]
text-[#5C6B73]
font-poppins
mb-6
text-center
">
Already have one?
<span className="text-[#FFC107] underline ml-1 cursor-pointer">
Sign in
</span>
</p>





<div className="w-full flex flex-col gap-6">



<div>

<label className="
text-[14px]
text-[#0A3A45]
font-poppins
block
mb-1
">
What's your full name?
</label>


<input

{...register("fullName")}

type="text"
  onInput={(e) => {
    e.target.value = e.target.value.replace(/[0-9]/g, "")}}

placeholder="Enter your full name"

className={`
w-full
px-4
py-3
rounded-[12px]
border-2
outline-none
bg-[#F7F9FA]

${errors.fullName 
? 
"border-[#EE1D52]"
:
"border-[#FFC107]"
}
`}

/>


{
errors.fullName &&
<p className="text-red-500 text-[12px] mt-1">
{errors.fullName.message}
</p>
}


</div>






<div>

<label className="
text-[14px]
text-[#0A3A45]
font-poppins
block
mb-1
">
What's your email?
</label>



<input

{...register("email")}

type="email"

placeholder="Enter your email"

className={`
w-full
px-4
py-3
rounded-[12px]
border-2
outline-none
bg-[#F7F9FA]

${errors.email 
?
"border-[#EE1D52]"
:
"border-[#FFC107]"
}
`}

/>



{
errors.email &&
<p className="text-red-500 text-[12px] mt-1">
{errors.email.message}
</p>
}


</div>






{
apiError &&
<p className="text-red-500 text-sm text-center">
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
font-semibold

"

>

{
loading
?
"Creating..."
:
"Continue"
}

</button>



</div>


</div>


)

}


export default StepOne