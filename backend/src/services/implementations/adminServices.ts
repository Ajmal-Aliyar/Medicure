import { IAdminRepository } from "../../repositories/interfaces/IAdminRepository";
import { checkBruteForce, deleteBruteForce } from "../../utils/BruteForceHandler";
import { verifyPassword } from "../../utils/passwordUtil";
import { generateAccessToken, generateRefreshToken } from "../../utils/tokenUtil";
import { IAdminServices } from "../interfaces/IAdminServices";
import { authorizedUserResponse } from "./authServices";


export class AdminServices implements IAdminServices {
    private adminRepository: IAdminRepository;

    constructor (adminRepository: IAdminRepository) {
        this.adminRepository = adminRepository
    }

    async signIn(email: string, password: string, role: string): Promise<authorizedUserResponse> {
            try {
                // await checkBruteForce(email,5,600)
                if (role !== 'admin') {
                    console.log(role,'rl')
                    throw new Error('This is only for admin');
                }
                const admin = await this.adminRepository.findByEmail(email);
                if (!admin) {
                    throw new Error('Invalid email or password');
                }
                const isPasswordValid = await verifyPassword(password, admin.password);
                if (!isPasswordValid) {
                    throw new Error('Invalid email or password');
                }
                await deleteBruteForce(email);
                const payload = {
                    _id: admin._id.toString(),
                    role,
                };
        
                const accessToken = generateAccessToken(payload);
                const refreshToken = generateRefreshToken(payload);
                return { accessToken, refreshToken, _id: admin._id.toString() };
            } catch (error) {
                console.error('Error during sign-in:', error);
                throw new Error(`Sign-in failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }
}