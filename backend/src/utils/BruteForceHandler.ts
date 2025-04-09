import { setRedisData, getRedisData, deleteRedisData } from "./redisUtil";
// const LOCK_TIMEOUT = 1800;

export const checkBruteForce = async (
  email: string,
  MAX_ATTEMPTS: number,
  LOCK_TIMEOUT: number
): Promise<void> => {
  console.log(email, MAX_ATTEMPTS, LOCK_TIMEOUT);
  const isLocked = await getRedisData(`account-locked:${email}`);
  console.log("isLocked:", isLocked);

  if (isLocked) {
    throw new Error(
      "Account temporarily locked due to multiple failed login attempts"
    );
  }

  const attempts = await getRedisData(`attempts:${email}`);
  console.log("login attempts:", attempts);

  if (attempts && parseInt(attempts) >= MAX_ATTEMPTS) {
    console.log("Exceeded max attempts, locking account...");
    await setRedisData(`account-locked:${email}`, "locked", LOCK_TIMEOUT);
    throw new Error(
      `Too many failed attempts. Account locked for ${
        LOCK_TIMEOUT / 60
      } minutes.`
    );
  } else {
    const newAttempts = attempts ? parseInt(attempts) + 1 : 1;
    console.log(`Total attempts : ${newAttempts}`);
    await setRedisData(
      `attempts:${email}`,
      newAttempts.toString(),
      LOCK_TIMEOUT
    );
  }
};

export const deleteBruteForce = async (email: string): Promise<void> => {
  await deleteRedisData(`account-locked:${email}`);
  await deleteRedisData(`attempts:${email}`);
};
