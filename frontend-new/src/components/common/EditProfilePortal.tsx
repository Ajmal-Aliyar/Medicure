import { useRef, type Dispatch, type SetStateAction } from "react";



export const EditProfilePortal: React.FC<{onClose: Dispatch<SetStateAction<string>>;
  children: React.ReactNode;}> = ({ children, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  

  return (
    <div className="fixed w-screen h-screen z-50 top-0 left-0 flex justify-center items-center p-4 backdrop-blur-[3px] bg-[#00000031]">

      <div ref={modalRef} className="relative w-full h-full md:w-[80%] lg:w-[60%] lg:h-[80%] bg-[#f8f8f8] rounded-md shadow-lg">
        <button className="absolute top-0 right-0 text-white bg-blue-400 font-extralight text-2xl px-3 cursor-pointer z-10 rounded-tr-md rounded-bl-md" onClick={() => onClose('')}>x</button>
        {children}
      </div>
    </div>
  );
};

