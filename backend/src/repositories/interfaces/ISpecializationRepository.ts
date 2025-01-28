export interface ISpecializationRepository {
    createSpecialization(name: string, image: string): Promise<void>
}