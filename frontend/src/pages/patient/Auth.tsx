import { useGSAP } from "@gsap/react";
import SideAuthComponent from "../../components/auth/SideAuthComponent";
import gsap from "gsap";
import AuthPage from "../../components/auth/Auth";
import { useState } from "react";
import VerificationForm from "../../components/auth/VerificationOTP";

function Auth() {
  const [ auth, setAuth] = useState(false)
  const handleAuth = (value:boolean) => {
    setAuth(value)
  }
  useGSAP(()=>{
    const tl = gsap.timeline()
    tl.from('.auth',{
      opacity:0,
      x:-100,
      duration:1.2,
    },'anime1')
    tl.from('.form',{
      opacity:0,
      x:100,
      duration:1.2,
    },'anime1')

    tl.from('.left-badge', {
      scale: 0,
      opacity:0,
      y: -100,
      delay:-0.2,
      duration: 2,
      ease: 'power3.out',
    }, 'anime2')
      .from('.right-badge', {
        scale: 0,
        opacity:0,
        y: 100,
        duration: 2,
        delay:-0.2,
        ease: 'power3.out',
      }, 'anime2');
  })
  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center pt-24">
      <div className="lg:w-[80%] w-[100%] relative flex">
        <div className="w-[50%] justify-center items-center hidden lg:flex mb-10 relative">
          <div className="w-[400px] h-[400px] bg-[#b6ddfb] absolute -top-10 rounded-full blur-2xl">
          </div>
          <SideAuthComponent />
          
        </div>

        <div className="w-[100%] lg:w-[50%] flex justify-center items-center">

          
            {auth ?
            <AuthPage handleAuth={handleAuth}/> :
            <VerificationForm handleAuth={handleAuth} email={email}/>
            }
          
          
        </div>
      </div>
    </div>
  );
}

export default Auth;