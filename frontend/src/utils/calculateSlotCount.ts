export const calculateSlotCount = (
  startTime: string,
  endTime: string,
  duration: number,
  buffer: number = 0
): number => {
  const toMinutes = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const startMinutes = toMinutes(startTime);
  const endMinutes = toMinutes(endTime);
  const totalAvailableTime = endMinutes - startMinutes;

  if (totalAvailableTime <= 0 || duration <= 0) return 0;

  const timePerSlot = duration + buffer;
  return Math.floor(totalAvailableTime / timePerSlot);
};
