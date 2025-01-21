import { faCalendarAlt, faUserDoctor, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill1 } from '@fortawesome/free-regular-svg-icons';


function HeaderCards() {
  return (
    <div className="flex flex-wrap justify-around md:justify-between gap-2 gap-y-5 p-3 lg:mt-0">
        <div className="lg:w-[270px] md:w-[48%] w-[270px]  rounded-md p-2 bg-[#16423C] shadow-md text-[#E9EFEC] relative">
          <div className="flex items-center">
            <div className="w-[50px] aspect-square rounded-md  bg-[#E9EFEC] flex items-center justify-center">
               <FontAwesomeIcon icon={faMoneyBill1} className={`text-[30px] duration-300 text-[#16423C]`} />
            </div>
            <p className="ml-2 text-md font-medium">Total Earning</p>
          </div>
          <p className="text-center font-bold text-xl">400K</p>
          <div className="right-0 left-0 h-[1px] bg-[#6a9c8967] absolute"></div>
          <p className="text-xs mt-2 pl-1">hai world this the ratign </p>
        </div>
        <div className="lg:w-[270px] md:w-[48%] w-[270px] rounded-md p-2 bg-[#fafafa] shadow-lg relative">
          <div className="flex items-center">
            <div className="w-[50px] aspect-square rounded-md  bg-[#C4DAD2] flex justify-center items-center">
              <FontAwesomeIcon icon={faUserDoctor} className={`text-[30px] duration-300 text-[#16423C]`} />
            </div>
            <p className="ml-2 text-md font-medium">Total Doctors</p>
          </div>
          <p className="text-center font-bold text-xl">400K</p>
          <div className="right-0 left-0 h-[1px] bg-neutral-300 absolute"></div>
          <p className="text-xs mt-2 pl-1">hai world this the ratign </p>
        </div>
        <div className="lg:w-[270px] md:w-[48%] w-[270px]  rounded-md p-2 bg-[#fafafa] shadow-lg relative">
          <div className="flex items-center">
            <div className="w-[50px] aspect-square rounded-md bg-[#C4DAD2]  flex justify-center items-center">
              <FontAwesomeIcon icon={faUserAlt} className={`text-[30px] duration-300 text-[#16423C]`} />
            </div>
            <p className="ml-2 text-md font-medium">Total Doctors</p>
          </div>
          <p className="text-center font-bold text-xl">400K</p>
          <div className="right-0 left-0 h-[1px] bg-neutral-300 absolute"></div>
          <p className="text-xs mt-2 pl-1">hai world this the ratign </p>
        </div>
        <div className="lg:w-[270px] md:w-[48%] w-[270px] rounded-md p-2 bg-[#fafafa] shadow-lg relative">
          <div className="flex items-center">
            <div className="w-[50px] aspect-square rounded-md  bg-[#C4DAD2] flex justify-center items-center">
              <FontAwesomeIcon icon={faCalendarAlt} className={`text-[30px] duration-300 text-[#16423C]`} />
            </div>
            <p className="ml-2 text-md font-medium">Total Doctors</p>
          </div>
          <p className="text-center font-bold text-xl">400K</p>
          <div className="right-0 left-0 h-[1px] bg-neutral-300 absolute"></div>
          <p className="text-xs mt-2 pl-1">hai world this the ratign </p>
        </div>
      </div>
  )
}

export default HeaderCards
