import React, { useState } from "react";

function LeftMenu() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = ["Dashboard", "Doctors", "Appointments", "Patients", "Finance", "Logout"];

  const handleItemClick = (item : string) => {
    setActiveItem(item);
  };

  return (
    <div className="w-[230px] h-full relative">
      <div className="w-[180px] flex flex-col gap-y-3 mt-5 ">
        {menuItems.map((item, index) => (
            <div className="flex gap-2">
                <span className={`${activeItem === item ? "opacity-100" : "opacity-0"} w-2 h-8 rounded-r-lg bg-blue-600`}></span>
                <p
            key={index}
            onClick={() => handleItemClick(item)}
            className={`cursor-pointer rounded-lg px-10 py-1 ${
              activeItem === item ? "text-white bg-black" : "text-black"
            }`}
          >
            {item}
          </p>
            </div>
          
        ))}
      </div>

      
    </div>
  );
}

export default LeftMenu;
