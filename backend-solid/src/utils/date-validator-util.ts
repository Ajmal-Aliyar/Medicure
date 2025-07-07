import { BadRequestError } from "@/errors";

  export const ensureTodayOrFuture = (dateStr: string): void  => {
    const inputDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    if (isNaN(inputDate.getTime())) {
      throw new BadRequestError("Invalid date format.");
    }

    inputDate.setHours(0, 0, 0, 0);

    if (inputDate < today) {
      throw new BadRequestError("Date must be today or in the future.");
    }
  }