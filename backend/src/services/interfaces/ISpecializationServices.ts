


export interface ISpecializationServices {
    createSpecialization({ name, image}:{name: string, image: string}): Promise<void>   
}