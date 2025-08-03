
import { getContainer } from "@/di";
import { TYPES } from "@/di/types";
import { ISlotCronJob } from "@/interfaces";


export const startCronJobs = () => {
    const container = getContainer()
  const slotCronJob = container.get<ISlotCronJob>(TYPES.SlotCronJob);
  slotCronJob.scheduleSlotCreationJob();

  console.log("⏰ All cron jobs started.");
};
