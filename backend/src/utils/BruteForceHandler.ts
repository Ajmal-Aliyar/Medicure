import { setRedisData, getRedisData, deleteRedisData} from './redisUtil';
const MAX_ATTEMPTS = 30;
const LOCK_TIMEOUT = 1800;    

export const checkBruteForce = async (email: string): Promise<void> => {
    const isLocked = await getRedisData(`account-locked:${email}`);
    console.log('isLocked:', isLocked);

    if (isLocked) {
        throw new Error('Account temporarily locked due to multiple failed login attempts');
    }

    const attempts = await getRedisData(`attempts:${email}`);
    console.log('login attempts:', attempts);

    if (attempts && parseInt(attempts) >= MAX_ATTEMPTS) {
        console.log('Exceeded max attempts, locking account...');
        await setRedisData(`account-locked:${email}`, 'locked', LOCK_TIMEOUT);
        throw new Error('Too many failed attempts. Account locked for 30 minutes.');
    } else {
        const newAttempts = attempts ? parseInt(attempts) + 1 : 1;
        console.log(`Total attempts : ${newAttempts}`)
        await setRedisData(`attempts:${email}`, newAttempts.toString(), LOCK_TIMEOUT);
    }
}

export const incrementAttempts = async (email: string): Promise<void> => {
    const currentAttempts = await getRedisData(`attempts:${email}`);
    const newAttempts = currentAttempts ? parseInt(currentAttempts) + 1 : 1;
    console.log(`Total attempts : ${newAttempts}`)
    await setRedisData(`attempts:${email}`, newAttempts.toString(), LOCK_TIMEOUT);
}

export const deleteBruteForce = async (email: string): Promise<void> => {
    await deleteRedisData(`account-locked:${email}`);
    await deleteRedisData(`attempts:${email}`);
}