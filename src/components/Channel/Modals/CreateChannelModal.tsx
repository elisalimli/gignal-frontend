import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useCreateChannelMutation } from "../../../generated/graphql";
import { useGetIdFromUrl } from "../../../utils/hooks/useGetIdFromUrl";
import { toErrorMap } from "../../../utils/toErrorMap";
import Button from "../../Button";
import Modal from "../../Modal/Modal";
import InputField from "../../utils/InputField";

const CreateChannelModal = ({ open, onClick }) => {
  const router = useRouter();
  const [createChannel] = useCreateChannelMutation();

  return (
    <Modal
      header="Create Channel"
      extraStyle={{ height: "40%" }}
      onClick={onClick}
      open={open}
    >
      <Formik
        initialValues={{ name: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await createChannel({
            variables: {
              input: {
                name: values.name,
                teamId: useGetIdFromUrl(router.query.teamId),
              },
            },
            update: (cache, { data }) => {
              cache.evict({ fieldName: "team" });
            },
          });
          const { errors, channel } = res?.data?.createChannel;
          if (errors) setErrors(toErrorMap(errors));
          else if (channel) {
            onClick();
            const { id, teamId } = channel;
            router.push(`/team/view/${teamId}/${id}`);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="name"
              label="Channel name"
              placeholder="Channel name"
            />

            <footer className="flex justify-end mt-8">
              <Button
                extraClassName="mr-4"
                borderRadius="lg"
                variant="solid"
                loading={isSubmitting}
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </Button>
              <Button
                borderRadius="lg"
                disabled={isSubmitting}
                onClick={onClick}
                variant="outline"
                type="button"
              >
                Close
              </Button>
            </footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateChannelModal;
