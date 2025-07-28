
interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

export const FilterSection = ({ title, children }: FilterSectionProps) => {
  return (
    <div className="flex gap-4 items-center text-sm">
      <p className="w-20 ">{title}:</p>
      <div className="flex gap-2">{children}</div>
    </div>
  );
};
