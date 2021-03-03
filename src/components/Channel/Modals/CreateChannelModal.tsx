import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useCreateChannelMutation } from "../../../generated/graphql";
import InputField from "../../utils/InputField";
import { toErrorMap } from "../../../utils/toErrorMap";
import { useGetIdFromUrl } from "../../../utils/hooks/useGetIdFromUrl";

const CreateChannelModal = ({ open, onClick }) => {
  const router = useRouter();
  const [createChannel] = useCreateChannelMutation();

  return (
    <Modal key="create-channel-modal" isOpen={open} onClose={onClick}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Channel</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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

                <ModalFooter>
                  <Button
                    isLoading={isSubmitting}
                    type="submit"
                    mr={3}
                    loadingText="Submitting"
                    colorScheme="blue"
                    variant="solid"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                  <Button
                    disabled={isSubmitting}
                    onClick={onClick}
                    variant="ghost"
                  >
                    Close
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateChannelModal;
