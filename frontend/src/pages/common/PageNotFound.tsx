import { FC } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import Img from "../../assets/external/page-not-foound.png";

const PageNotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <img src={Img} alt="Page Not Found" className="md:max-w-[500px] max-w-full p-10 md:p-0 " />
      <div
        onClick={() => navigate(-1)}
        className="relative bg-[#5e96ca] p-3 rounded-md text-white font-medium mt-4 duration-200 hover:scale-105
             after:content-[''] after:w-full after:h-1 after:bg-[#000000a5] after:absolute after:-bottom-3 
             after:left-0 after:rounded-full after:blur-[10px]"
      >
        Back to Previous Page
      </div>

    </div>
  );
};

export default PageNotFound;
