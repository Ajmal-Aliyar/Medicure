import { type FC } from "react";

interface StatBadgeProps {
  images: string[];
  count: string;
  label: string;
}

export const StatBadge:FC<StatBadgeProps> = ({ images, count, label }) => {
  return (
    <div className="relative h-full flex justify-center items-center gap-2">
      <div className="relative flex justify-center items-center h-full gap-[-4px]">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`${label} ${index + 1}`}
            className={`rounded-full w-[15px] h-[15px] md:w-[20px] md:h-[20px] lg:w-[35px] lg:h-[35px] ${index === 1 ? 'scale-125 z-10' : ''}`}
          />
        ))}
      </div>
      <p className="flex flex-col items-center leading-tight text-center mt-1">
        <span className="font-semibold text-sm lg:text-xl">{count}</span>
        <span className="text-xs font-medium">{label}</span>
      </p>
    </div>
  );
};
