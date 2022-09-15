import { useState } from "react";

export default function useForm(
    initialValues: { [key: string]: any; },
    validators?: { [key: string]: (value: string) => string | void; }
) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState<any>();

    const validate = () => {
        const errors: { [key: string]: string; } = {};
        let noErrors = true;
        Object.keys(values).forEach(key => {
            if (validators && validators[key]) {
                const error = validators[key](values[key]);
                if (error) {
                    errors[key] = error;
                    noErrors = false;
                }
            }
        });
        if (noErrors) return null;
        setErrors(errors);
        return errors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(values => ({ ...values, [name]: value }));
    };

    return { values, handleChange, validate, errors };
}