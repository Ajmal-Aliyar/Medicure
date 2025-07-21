

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    className?: string
}
export const Textarea: React.FC<TextareaProps> = ({ label,  className = '', ...props }) => (
     <div className={`${className} space-y-1`}>
        <label className="text-sm font-medium">{label}</label>
        <textarea
            {...props}
            className="w-full border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            rows={3}
        />
    </div>
);
