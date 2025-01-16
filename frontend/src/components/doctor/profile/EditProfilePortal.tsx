import ReactDOM from "react-dom"

type EditProfileSectionProps = {
  children: React.ReactNode;
};

const EditProfilePortal: React.FC<EditProfileSectionProps> = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="fixed w-screen h-screen z-50 top-0 flex justify-center items-center p-4 backdrop-blur-[3px] bg-[#00000031]">

    <div className="w-full h-full md:w-[80%] lg:w-[60%] lg:h-[80%] bg-[#f8f8f8] rounded-md shadow-lg">
      {children}
    </div>
    </div>,
    document.getElementById('alert-root') as HTMLElement
  );
};

export default EditProfilePortal;
