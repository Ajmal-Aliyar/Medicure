import { useState } from "react";


function Signin() {
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  return (
    <div className="form flex flex-col items-center justify-center min-h-[350px] w-[350px] lg:w-[400px] bg-[#b6ddfb] shadow-lg rounded-lg py-10 "
    style={{boxShadow: '16px 16px 32px #c8c8c8, -16px -16px 32px #fefefe'}}>
          <a className="text-[#0c0b3e] uppercase font-bold text-xl tracking-wider mb-4">
            sign in
          </a>
          <div className="relative w-[250px] mt-6">
            <input
              type="text"
              required
              id="username"
              className={`w-full p-3  ${usernameFocused ?'border-t-2 border-r-2 rounded-lg ring-0 ':''} border-b-2 border-l-2 border-[#0c0b3eb5] bg-transparent outline-none text-[#0c0b3eb5] text-base  rounded-bl-lg  transition duration-300 `}
              onFocus={() => setUsernameFocused(true)}
              onBlur={(e) => {
                if(e.target.value === ''){
                  setUsernameFocused(false)}
                }
              }
                
            />
            <label
              htmlFor="username"
              className={`absolute  transform -translate-y-4 text-[10px] uppercase tracking-[0.1em]  left-4  pointer-events-none text-[#0c0b3eb5] bg-[#b6ddfb] rounded-lg px-2 py-1  top-1`}
            >
             <p className={`${usernameFocused ?'translate-y-0 text-[#0c0b3e]':'translate-y-6 scale-125 text-gray-500'} ease-out duration-300 transition-all`}>Username</p> 
            </label>
          </div>


          <div className="relative w-[250px] mt-6">
            <input
              type="password"
              required
              className={`w-full p-3   ${passwordFocused ?'border-t-2 border-r-2 rounded-lg ring-0':''} border-b-2 border-l-2 border-[#0c0b3eb5] bg-transparent outline-none text-[#0c0b3eb5] text-base  rounded-bl-lg  transition duration-300 `}
              onFocus={() => setPasswordFocused(true)}
              onBlur={(e) => {
                if(e.target.value === ''){
                  setPasswordFocused(false)}
                }
              }
            />
             <label
              htmlFor="password"
              className={`absolute  transform -translate-y-4 text-[10px] uppercase tracking-[0.1em]  left-4  pointer-events-none  bg-[#b6ddfb] rounded-lg px-2 py-1  top-1`}
            >
             <p className={`${passwordFocused ?'translate-y-0 text-[#0c0b3e]':'translate-y-6 scale-125 text-gray-500'} ease-out duration-300 transition-all`}>Password</p> 
            </label>
            <p className="text-gray-600 text-xs text-end">Forgot Password?</p>
          </div>

          <button className="mt-8 w-[250px] h-[45px]  border-2 border-[#0c0b3eb5] text-xs uppercase tracking-wider cursor-pointer transition duration-300 bg-[#0c0b3eb5] hover:bg-[#0c0b3e] text-white rounded-md active:scale-90 ">
            Sign in
          </button>
          <div className="h-[100px] flex items-center">
            <p className="text-gray-600">Don't have an account? <a href="" className="text-[#0c0b3e] font-medium">Sign up</a></p>
          </div>
        </div>
  )
}

export default Signin
