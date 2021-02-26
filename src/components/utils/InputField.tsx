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

const InputField: React.FC<InputFieldProps> = ({
  label = false,
  textarea,
  size: _,
  variant = "outline",
  ...props
}) => {
  let InputOrTextarea;
  if (textarea) {
    InputOrTextarea = Textarea;
  } else InputOrTextarea = Input;

  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      {label ? (
        <FormLabel className="mt-4" htmlFor={field.name}>
          {label}
        </FormLabel>
      ) : null}
      <InputOrTextarea
        variant={variant}
        {...field}
        {...props}
        id={field.name}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
export default InputField;
