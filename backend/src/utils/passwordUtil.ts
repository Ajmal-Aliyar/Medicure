import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
    try {
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Password hashing failed');
    }
}

export const verifyPassword = async ( password: string, hashedPassword: string ): Promise<boolean> => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        console.error('Error verifying password:', error);
        throw new Error('Password verification failed');
    }
}
