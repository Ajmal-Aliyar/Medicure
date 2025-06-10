import { CategorizedSlots } from "@/dtos";
import { ISlot } from "@/models";

export class DoctorSlotMapper {
  static toGetSlotByDoctorAndDate(doctorId: string, data: ISlot[]): CategorizedSlots {
    const categorized: CategorizedSlots = {
      morning: [],
      afternoon: [],
      evening: [],
      night: [],
      lateNight: [],
    };

    data.forEach((slot) => {
      const hour = parseInt(slot.startTime.split(':')[0]);

      if (hour >= 6 && hour < 12) {
        categorized.morning.push(slot);
      } else if (hour >= 12 && hour < 16) {
        categorized.afternoon.push(slot);
      } else if (hour >= 16 && hour < 20) {
        categorized.evening.push(slot);
      } else if (hour >= 20 && hour < 24) {
        categorized.night.push(slot);
      } else {
        categorized.lateNight.push(slot); 
      }
    });
    console.log(categorized, 'ct');
    
    return categorized;
  }
}
