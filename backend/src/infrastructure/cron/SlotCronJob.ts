import cron from "node-cron";
import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { IAppointmentService, IScheduleService, ISlotService } from "@/services";
import { IDoctorSchedule, ISlot } from "@/models";
import { generateSlotsForAdvanceDays } from "@/utils";
import { ISlotCronJob } from "@/interfaces";

@injectable()
export class SlotCronJob implements ISlotCronJob {
  constructor(
    @inject(TYPES.ScheduleService)
    private readonly _scheduleService: IScheduleService,

    @inject(TYPES.SlotService)
    private readonly _slotService: ISlotService,

     @inject(TYPES.AppointmentService)
    private readonly _appointmentService: IAppointmentService,
  ) {}

  public scheduleSlotCreationJob(): void {
    // cron.schedule("33 23 * * *", async () => {
    cron.schedule("00 18 * * *", async () => {
      console.log("🕐 [Cron] Starting slot generation...");

      const schedules: IDoctorSchedule[] =
        await this._scheduleService.findActiveDoctorSchedules();

      if (!schedules.length) {
        return;
      }

      for (const schedule of schedules) {
        const slots = generateSlotsForAdvanceDays(schedule);
        const slotsByDate = new Map<Date, Partial<ISlot>[]>();

        for (const slot of slots) {
          if (!slot.date) continue;

          const key = slot.date

          if (!slotsByDate.has(key)) {
            slotsByDate.set(key, []);
          }

          slotsByDate.get(key)!.push(slot);
        }

        for (const [dateStr, slotsForDay] of slotsByDate.entries()) {
            const newSlots = await this._slotService.getNewSlotsForDate( String(schedule.doctorId), dateStr, slotsForDay)
          if (!newSlots.length) continue;

          const BATCH_SIZE = 5;
          for (let i = 0; i < newSlots.length; i += BATCH_SIZE) {
            const batch = newSlots.slice(i, i + BATCH_SIZE);
            await this._slotService.createBulkSlots(batch);
          }
        }
      }

      console.log("✅ [Cron] Slot generation completed.");
      this._appointmentService.updateNoShow()
      console.log("✅ [Cron] Update no show completed.");
    });
  }
}
