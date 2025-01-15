import { useState } from "react";
import AlertPortal from "../../common/AlertPortal";

function Banner() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const showAlertMessage = () => {
    setAlertMessage("Are you sure you want to log out?");
    setShowAlert(true);
  };
  const closeAlert = () => {
    setShowAlert(false);
};
  return (
    <div className="flex justify-between items-center w-full p-5 lg:px-16 bg-white md:shadow-md border-b-2 md:border-0">
      <p className="text-4xl font-extrabold text-[#0c0b3eb5] tracking-wide">MEDI CURE</p>
      <button className="border-2 border-[#0c0b3eb5] text-[#0c0b3eb5] rounded-full px-5 py-2 font-medium cursor-pointer 
      transition duration-300 hover:bg-[#0c0b3eb5] hover:text-white active:scale-95" onClick={showAlertMessage}>
        Log out
      </button>
      {showAlert && (
        <AlertPortal message={alertMessage} onClose={closeAlert} />
      )}
    </div>
  )
}

export default Banner
