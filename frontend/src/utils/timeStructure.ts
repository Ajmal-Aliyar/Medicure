
export const convertTo12HourFormat = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
};

export const convertTimeStringToDate = (timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const currentDate = new Date();
    currentDate.setHours(hours, minutes, 0, 0);
    return currentDate;
};

export const convertTimestampToDate = (timeStamp: string) => {
    const date = new Date(timeStamp);

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export const convertToDateAndTime = (isoString: string) => {
    const date = new Date(isoString);
  
    return date.toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
  };
  