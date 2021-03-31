import { Form, Formik } from "formik";
import React, { useState } from "react";
import InputField from "../utils/InputField";
import FileUploadSection from "../Sections/FileUploadSection";

interface Props {
  placeholder: string;
  onSubmit?: (message: string) => void;
}

const SendMessage: React.FC<Props> = ({ onSubmit, placeholder }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="input p-2">
      <Formik
        initialValues={{ message: "" }}
        onSubmit={async (values, { setErrors, resetForm }) => {
          const { message } = values;
          if (!message || !message.trim() || loading) return;

          setLoading(true);
          await onSubmit(message);
          setLoading(false);

          resetForm();
        }}
      >
        {() => (
          <Form className="flex items-center">
            <FileUploadSection />
            <InputField
              name="message"
              autoComplete="off"
              placeholder={`Send a message to #${placeholder}`}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SendMessage;
