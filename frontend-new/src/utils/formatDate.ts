export const formatTimeTo12Hour = (time: string): string => {
  const [hourStr, minuteStr] = time.split(":");
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

  return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`; // 12:00 PM
}

export const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric" }); // Julu 15
};


export const isToday = (dateStr: string): boolean => {
  const today = new Date();
  const date = new Date(dateStr);
  
  return (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  );
};

export const formatDateToYMD = (dateInput: string | Date): string => {
  const date = new Date(dateInput);

  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2); 
  const day = (`0${date.getDate()}`).slice(-2);

  return `${year}-${month}-${day}`; //2000-05-23
}

export function formatDateToLong(dateStr: string): string {
  const date = new Date(dateStr);

  if (isNaN(date.getTime())) return "Invalid Date";

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" }); 
  const year = date.getFullYear();

  return `${day} ${month} ${year}`; //23 04 1324
}

export function parseToMD(dateInput: Date | string): string {
  console.log(dateInput);
  
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  console.log(date);
  
  if (isNaN(date.getTime())) return ""; 
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const m = monthNames[date.getMonth()];
  const d = date.getDate().toString().padStart(2, "0");

  return `${m} ${d}`;
}


export const formatTo12HourTime = (dateInput: Date | string): string => {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${hours}:${formattedMinutes}${ampm}`;
};
