export const getNext7Days = () => {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const value = `${yyyy}-${mm}-${dd}`;

    let label;
    if (i === 0) label = "Today";
    else if (i === 1) label = "Tomorrow";
    else {
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      label = `${dayName} ${dd}/${mm}`;
    }

    return { label, value };
  });
};