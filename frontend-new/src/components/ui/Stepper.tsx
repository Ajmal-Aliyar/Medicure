interface Props {
  slides: string[];
  step: number;
  setStep: (index: number) => void;
}

const Stepper = ({ slides, step, setStep }: Props) => {
  return (
    <div className="flex justify-center gap-2">
      {slides.map((label, index) => (
        <button
          key={index}
          onClick={() => setStep(index)}
          className={`px-4 py-2 rounded-md text-sm font-medium cursor-pointer active:scale-95 transition-all duration-300 ${
            step === index ? "bg-primary-light text-white" : "bg-gray-200 text-muted-dark"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default Stepper;
