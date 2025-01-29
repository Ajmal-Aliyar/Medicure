import { ISpecialization } from "../../models/specialization/specializationInterface"


export interface ISpecializationServices {
    createSpecialization({ name, image, description}:{name: string, image: string, description: string}): Promise<string>   
    fetchAllSpecialization(): Promise<ISpecialization[]>
    fetchByName(name:string): Promise<ISpecialization>
}
