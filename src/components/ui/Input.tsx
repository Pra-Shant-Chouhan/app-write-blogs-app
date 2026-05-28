import { forwardRef, useId, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    { label, type = "text", className = "", id, ...props },
    ref
) {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
        <div className="w-full">
            {label && (
                <label className="inline-block mb-1 pl-1" htmlFor={inputId}>
                    {label}
                </label>
            )}

            {/* forwardRef<HTMLInputElement, InputProps>: first type is the input DOM element, second type is this component's props. */}
            <input
                id={inputId}
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                ref={ref}
                {...props}
            />
        </div>
    );
});

export default Input;
