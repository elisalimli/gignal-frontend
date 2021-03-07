import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputElementProps,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  InputElementProps & {
    label?: string | boolean;
    name: string;
    textarea?: boolean;
    variant?: string;
  };

// '' => false
// 'error message stuff' => true

const style = {
  input:
    "w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out",
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
        <label className="mt-4 font-medium" htmlFor={field.name}>
          {label}
        </label>
      ) : null}

      {textarea ? (
        <textarea
          {...field}
          {...props}
          id={field.name}
          className={style.input}
        />
      ) : (
        <input {...field} {...props} id={field.name} className={style.input} />
      )}
      {error ? (
        <div style={{ color: "#E53E3E" }} className="mt-2 text-sm">
          {error}
        </div>
      ) : null}
    </>
  );
};
export default InputField;
