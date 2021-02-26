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
import { useGetTeamIdFromUrl } from "../../../../hooks/useGetTeamIdFromUrl";
import { useAddTeamMemberMutation } from "../../../generated/graphql";
import { toErrorMap } from "../../../utils/toErrorMap";
import InputField from "../../utils/InputField";

const InvitePeopleModal = ({ open, setOpen }) => {
  const router = useRouter();
  const handleClose = () => setOpen(false);
  const [addMember] = useAddTeamMemberMutation();

  return (
    <Modal key="invite-people-modal" isOpen={open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Invite Someone</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={async (values, { setErrors }) => {
              const teamId = useGetTeamIdFromUrl(router.query.teamId);
              const res = await addMember({
                variables: { input: { email: values.email, teamId } },
                update: (cache) => {
                  cache.evict({ fieldName: "team" });
                },
              });
              const { errors, ok } = res?.data?.addTeamMember;
              if (errors) setErrors(toErrorMap(errors));
              else handleClose();

              //   const res = await createChannel({
              //     variables: {
              //       input: {
              //         name: values.name,
              //         teamId: useGetTeamIdFromUrl(router.query.teamId),
              //       },
              //     },
              //     update: (cache, { data }) => {
              //       cache.evict({ fieldName: "team" });
              //     },
              //   });
              //   const { errors, channel } = res?.data?.createChannel;
              //   if (errors) setErrors(toErrorMap(errors));
              //   else if (channel) {
              //     handleClose();
              //     const { id, teamId } = channel;
              //     router.push(`/team/view/${teamId}/${id}`);
              //   }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  name="email"
                  label="User's email"
                  placeholder="User's email"
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
                    onClick={handleClose}
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

export default InvitePeopleModal;
