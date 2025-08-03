import { type ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "muted" | "red" | "green" | "outline"

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  fullWidth?: boolean;
  className?: string
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const baseClasses = "rounded-md transition cursor-pointer active:scale-95";
const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-secondary py-2 text-white hover:bg-secondary-dark font-semibold ",
  outline: "border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300  ",
  muted: "bg-muted text-white hover:bg-muted-dark",
  red: "bg-red-600/80 text-white hover:bg-red-700/80",
  green: "bg-green-600/80 text-white hover:bg-green-700/80"
};

export const Button = ({
  children,
  variant = "primary",
  fullWidth = false,
  className,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
    onClick={onClick}
      className={clsx(baseClasses, variants[variant], { "w-full": fullWidth }, className)}
      {...props}
    >
      {children}
    </button>
  );
};
