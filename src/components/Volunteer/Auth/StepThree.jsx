import { useState } from "react";

import eyeClosedIcon from '../../../images/Icons/eye-slash.png'
import eyeOpenIcon from '../../../images/Icons/open-eye.png'


const StepThree = ({
register,
errors,
onNext,
loading,
apiError
})=>{


const [showPassword,setShowPassword]=useState(false)

const [showConfirm,setShowConfirm]=useState(false)



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
Create password
</h1>




<div className="relative w-full">


<input

{...register("password")}

type={
showPassword
?
"text"
:
"password"
}

placeholder="Enter password"

className="
w-full
px-4
py-3
rounded-[12px]
border-2
border-[#FFC107]
outline-none
"

/>


<img

src={
showPassword
?
eyeOpenIcon
:
eyeClosedIcon
}

onClick={()=>
setShowPassword(!showPassword)
}

className="
absolute
right-4
top-1/2
-translate-y-1/2
w-5
cursor-pointer
"

/>


</div>



{
errors.password &&
<p className="text-red-500 text-[12px]">
{errors.password.message}
</p>
}






<div className="relative w-full">


<input

{...register("confirmPassword")}

type={
showConfirm
?
"text"
:
"password"
}

placeholder="Confirm password"

className="
w-full
px-4
py-3
rounded-[12px]
border-2
border-[#FFC107]
outline-none
"

/>


<img

src={
showConfirm
?
eyeOpenIcon
:
eyeClosedIcon
}

onClick={()=>
setShowConfirm(!showConfirm)
}

className="
absolute
right-4
top-1/2
-translate-y-1/2
w-5
cursor-pointer
"

/>


</div>




{
errors.confirmPassword &&
<p className="text-red-500 text-[12px]">
{errors.confirmPassword.message}
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
"Creating account..."
:
"Get Started"
}


</button>




</div>

)

}


export default StepThree