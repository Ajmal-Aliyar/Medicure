export function fillMissingDays(
    startDate: Date,
    endDate: Date,
    data: { date: string; appointments: number; revenue: number }[]
  ): { date: string; appointments: number; revenue: number }[] {
    const result: { date: string; appointments: number; revenue: number }[] = [];
    const dateMap = new Map(data.map((item) => [item.date, item]));
  
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD
      result.push(
        dateMap.get(dateStr) ?? { date: dateStr, appointments: 0, revenue: 0 }
      );
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return result;
  }
  