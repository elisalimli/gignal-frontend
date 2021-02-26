import { Form, Formik } from "formik";
import React, { useState } from "react";
import {
  ChannelsSnippetFragment,
  useCreateMessageMutation,
} from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import InputField from "../utils/InputField";

interface Props {
  channel: ChannelsSnippetFragment;
}

const SendMessage: React.FC<Props> = ({ channel: { name, id } }) => {
  const [createMessage] = useCreateMessageMutation();
  const [loading, setLoading] = useState(false);

  return (
    <div className="input box bg-gray-100">
      <Formik
        initialValues={{ message: "" }}
        onSubmit={async (values, { setErrors, resetForm }) => {
          const { message } = values;
          if (!message || !message.trim() || loading) return;

          setLoading(true);
          const res = await createMessage({
            variables: { input: { channelId: id, text: message } },
          });
          setLoading(false);

          resetForm();
          console.log("res", res);
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form>
            <InputField
              name="message"
              autoComplete="off"
              borderColor="#C5CFDA"
              placeholder={`Send a message to #${name}`}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SendMessage;
