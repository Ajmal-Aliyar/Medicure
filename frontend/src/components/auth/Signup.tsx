import { useState } from "react";


function Signup() {
  const [nameFocused, setnameFocused] = useState(false);
  const [emailFocused, setemailFocused] = useState(false);
  const [mobileFocused, setmobileFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  return (
    <div className="form flex flex-col items-center justify-center min-h-[350px] w-[350px] lg:w-[400px] bg-[#b6ddfb] shadow-lg rounded-lg py-10 "
    style={{boxShadow: '16px 16px 32px #c8c8c8, -16px -16px 32px #fefefe'}}>
          <a className="text-[#0c0b3e] uppercase font-bold text-xl tracking-wider mb-4">
            SIGN UP
          </a>
          <div className="relative w-[250px] mt-6">
            <input
              type="text"
              required
              id="username"
              className={`w-full p-3  ${nameFocused ?'border-t-2 border-r-2 rounded-lg ring-0 ':''} border-b-2 border-l-2 border-[#0c0b3eb5] bg-transparent outline-none text-[#0c0b3eb5] text-base  rounded-bl-lg  transition duration-300 `}
              onFocus={() => setnameFocused(true)}
              onBlur={(e) => {
                if(e.target.value === ''){
                  setnameFocused(false)}
                }
              }
                
            />
            <label
              htmlFor="username"
              className={`absolute  transform -translate-y-4 text-[10px] uppercase tracking-[0.1em]  left-4  pointer-events-none text-[#0c0b3eb5] bg-[#b6ddfb] rounded-lg px-2 py-1  top-1`}
            >
             <p className={`${nameFocused ?'translate-y-0 text-[#0c0b3e]':'translate-y-6 scale-125 text-gray-500'} ease-out duration-300 transition-all`}>Name</p> 
            </label>
          </div>

          <div className="relative w-[250px] mt-6">
            <input
              type="text"
              required
              id="username"
              className={`w-full p-3  ${emailFocused ?'border-t-2 border-r-2 rounded-lg ring-0 ':''} border-b-2 border-l-2 border-[#0c0b3eb5] bg-transparent outline-none text-[#0c0b3eb5] text-base  rounded-bl-lg  transition duration-300 `}
              onFocus={() => setemailFocused(true)}
              onBlur={(e) => {
                if(e.target.value === ''){
                  setemailFocused(false)}
                }
              }
                
            />
            <label
              htmlFor="username"
              className={`absolute  transform -translate-y-4 text-[10px] uppercase tracking-[0.1em]  left-4  pointer-events-none text-[#0c0b3eb5] bg-[#b6ddfb] rounded-lg px-2 py-1  top-1`}
            >
             <p className={`${emailFocused ?'translate-y-0 text-[#0c0b3e]':'translate-y-6 scale-125 text-gray-500'} ease-out duration-300 transition-all`}>email</p> 
            </label>
          </div>

          <div className="relative w-[250px] mt-6">
            <input
              type="text"
              required
              id="username"
              className={`w-full p-3  ${mobileFocused ?'border-t-2 border-r-2 rounded-lg ring-0 ':''} border-b-2 border-l-2 border-[#0c0b3eb5] bg-transparent outline-none text-[#0c0b3eb5] text-base  rounded-bl-lg  transition duration-300 `}
              onFocus={() => setmobileFocused(true)}
              onBlur={(e) => {
                if(e.target.value === ''){
                  setmobileFocused(false)}
                }
              }
                
            />
            <label
              htmlFor="username"
              className={`absolute  transform -translate-y-4 text-[10px] uppercase tracking-[0.1em]  left-4  pointer-events-none text-[#0c0b3eb5] bg-[#b6ddfb] rounded-lg px-2 py-1  top-1`}
            >
             <p className={`${mobileFocused ?'translate-y-0 text-[#0c0b3e]':'translate-y-6 scale-125 text-gray-500'} ease-out duration-300 transition-all`}>mobile</p> 
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

          </div>

          <button className="mt-8 w-[250px] h-[45px]  border-2 border-[#0c0b3eb5] text-xs uppercase tracking-wider cursor-pointer transition duration-300 bg-[#0c0b3eb5] hover:bg-[#0c0b3e] text-white rounded-md active:scale-90 ">
            Sign up
          </button>
          <div className="h-[100px] flex items-center">
            <p className="text-gray-600">Already have an account? <a href="" className="text-[#0c0b3e] font-medium">Sign in</a></p>
          </div>
        </div>
  )
}

export default Signup
