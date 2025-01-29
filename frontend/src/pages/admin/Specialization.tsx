import { useState } from "react";
import CategoryCard from "../../components/admin/specialization/CategoryCard";
import CreateSpecialization from "../../components/admin/specialization/CreateSpecialization";


const Specialization = () => {
    const [mount, setMount] = useState(false)
    return (
        <div className="relative w-full h-full flex flex-wrap flex-1 p-2 md:p-6 mt-16 gap-3 justify-around lg:justify-start lg:mt-0">
            <CreateSpecialization setMount={setMount}/>
            <CategoryCard mount={mount}/>
            <div className="p-10 w-full"></div>
        </div>
    );
};

export default Specialization;

