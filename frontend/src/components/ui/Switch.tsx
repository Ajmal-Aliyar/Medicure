const Switch = ({
    label,
    value,
    color = "blue",
    onChange,
  }: {
    label: string;
    value: boolean;
    color?: "green" | "blue" | "red";
    onChange?: (val: boolean) => void;
  }) => {
    const colorClass =
      color === "green"
        ? "bg-green-600/80"
        : color === "red"
        ? "bg-red-600/80"
        : "bg-primary";

    return (
      <div className="flex items-center justify-between">
        <span className="font-medium">{label}</span>
        <button
          onClick={() => onChange?.(!value)}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
            value ? colorClass : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
              value ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    );
  };

  export default Switch;