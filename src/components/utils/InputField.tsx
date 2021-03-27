import { useField } from "formik";
import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export const textFieldStyle = {
  input:
    "w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out",
  error: "text-red-600 mt-2 text-sm",
  label: "mt-4 font-medium",
};

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string | boolean;
    name: string;
    textarea?: boolean;
    variant?: string;
  };

const InputField: React.FC<InputFieldProps> = ({
  label = false,
  textarea,
  size: _,
  variant = "outline",
  ...props
}) => {
  const [field, { error }] = useField(props);

  return (
    <>
      {label ? (
        <label className={textFieldStyle.label} htmlFor={field.name}>
          {label}
        </label>
      ) : null}

      {textarea ? (
        <textarea
          {...field}
          {...props}
          id={field.name}
          className={textFieldStyle.input}
        />
      ) : (
        <input
          {...field}
          {...props}
          id={field.name}
          className={textFieldStyle.input}
        />
      )}
      {error ? <div className={textFieldStyle.error}>{error}</div> : null}
    </>
  );
};
export default InputField;
