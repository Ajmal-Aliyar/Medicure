import React, { useState } from "react";
import type { AuthFormProps } from "./formTypes";
import { labels, types } from "./formHelper";
import { FloatingInput } from "@/components/ui/FloatingInput";
import { Button } from "@/components/ui/Button";


export const AuthForm = ({ fields, onSubmit, submitText = "Submit" }: AuthFormProps) => {
    const [formState, setFormState] = useState<Record<string, string>>({});

    const handleChange = (field: string, value: string) => {
        setFormState((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formState);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-2xs">
            {fields.map((field) => (
                <div key={field}>
                    <FloatingInput
                        id={field}
                        type={types[field]}
                        label={labels[field]}
                        onChange={handleChange}
                        value={formState[field] || ""}
                    />
                </div>
            ))}
            <Button variant="secondary" fullWidth>
                <p className="font-light text-lg">{submitText}</p>
            </Button>
        </form>
    );
};
