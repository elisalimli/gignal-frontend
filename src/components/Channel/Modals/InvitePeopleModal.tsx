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
import { useAddTeamMemberMutation } from "../../../generated/graphql";
import { toErrorMap } from "../../../utils/toErrorMap";
import InputField from "../../utils/InputField";
import { useGetIdFromUrl } from "../../../utils/hooks/useGetIdFromUrl";

const InvitePeopleModal = ({ open, onClick }) => {
  const router = useRouter();
  const [addMember] = useAddTeamMemberMutation();

  return (
    <Modal key="invite-people-modal" isOpen={open} onClose={onClick}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Invite Someone</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={async (values, { setErrors }) => {
              const teamId = useGetIdFromUrl(router.query.teamId);
              const res = await addMember({
                variables: { input: { email: values.email, teamId } },
                update: (cache) => {
                  cache.evict({ fieldName: "getTeamMembers" });
                },
              });
              const { errors, ok } = res?.data?.addTeamMember;
              if (errors) setErrors(toErrorMap(errors));
              else onClick();
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

export default InvitePeopleModal;
