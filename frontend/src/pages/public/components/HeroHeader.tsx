
import React from "react";

interface HeroHeaderProps {
  title?: string;
  description?: string;
  buttonText?: string;
  imageUrl?: string;
  hasButton?: boolean;
  variant?: "hero" | "mini";
}

const HeroHeader: React.FC<HeroHeaderProps> = ({
  title,
  description,
  buttonText,
  imageUrl,
  hasButton = false,
  variant = "hero",
}) => {
  const isHero = variant === "hero";

  return (
    <div
      className={`w-full flex justify-around mt-10 bg-gradient-to-r  from-[#83c5f8ce] to-[#6fb8f4] ${
        isHero ? "h-[300px]" : "h-[150px]"
      } rounded-2xl relative overflow-hidden`}
    >
      <div
        className={`w-[60%] h-full bg-[#b8d7ef91] rounded-[50%] absolute ${
          isHero ? "-bottom-[240px] -right-[90px] -rotate-12" : "-bottom-[70px] -right-[40px] -rotate-6"
        } translateRight`}
      ></div>

      <div className="flex h-full flex-col justify-center gap-4 pl-3 z-10">
        {title && (
          <p
            className={`text-white max-w-[600px] translateLeft cursor-default ${
              isHero ? "text-xl md:text-5xl font-semibold" : "lg:text-lg md:text-md text-sm"
            }`}
          >
            {title}
          </p>
        )}

        {description && (
          <p className="lg:text-lg md:text-md text-sm text-white max-w-[600px] translateLeft cursor-default">
            {description}
          </p>
        )}

        {hasButton && buttonText && isHero && (
          <button className="uppercase w-fit text-primary bg-white text-sm font-semibold px-10 py-2 rounded-md translateLeft text-center">
            {buttonText}
          </button>
        )}
      </div>

      {imageUrl && (
        <div className={`items-end flex ${isHero ? "translate-x-16" : "translate-y-16"}`}>
          <img
            src={imageUrl}
            alt=""
            className={`z-10 translateUp ${isHero ? "max-h-[95%]" : "max-w-[200px]"}`}
          />
        </div>
      )}
    </div>
  );
};

export default HeroHeader;
