import gsap from "gsap";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom"
import { IEditProfilePortalProps } from "../../../types/doctor/profileType";



const EditProfilePortal: React.FC<IEditProfilePortalProps> = ({ children, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );
  }, []);
  const handleClose = () => {

    const tl = gsap.timeline()

    tl.to(modalRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.2,
      ease: 'power2.in',
    });

    tl.to('.main-div', {
      // opacity: 0,
      duration: 0.3,
      onComplete: () => onClose && onClose('')
    })

  };
  return ReactDOM.createPortal(
    <div className="main-div fixed w-screen h-screen z-50 top-0 flex justify-center items-center p-4 backdrop-blur-[3px] bg-[#00000031]">

      <div ref={modalRef} className="w-full h-full md:w-[80%] lg:w-[60%] lg:h-[80%] bg-[#f8f8f8] rounded-md shadow-lg">
        <button className="absolute top-0 right-0 text-white bg-blue-400 font-extralight text-2xl px-3 cursor-pointer z-10 rounded-tr-md rounded-bl-md" onClick={handleClose}>x</button>

        {children}
      </div>
    </div>,
    document.getElementById('alert-root') as HTMLElement
  );
};

export default EditProfilePortal;
