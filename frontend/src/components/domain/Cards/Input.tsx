interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    className?: string
}
export const Input: React.FC<InputProps> = ({ label, className, ...props }) => (
    <div className={`${className} space-y-1`}>
        <label className="text-sm font-medium">{label}</label>
        <input
            {...props}
            className="w-full border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300 "
        />
    </div>
);