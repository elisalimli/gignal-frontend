import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React from "react";

import { useAddTeamMemberMutation } from "../../../generated/graphql";
import { useGetIdFromUrl } from "../../../utils/hooks/useGetIdFromUrl";
import { toErrorMap } from "../../../utils/toErrorMap";
import Modal from "../../Modal/Modal";
import InputField from "../../utils/InputField";
import Button from "../../Button";

interface Props {
  open: boolean;
  onClick: () => void;
}
const InvitePeopleModal = ({ open, onClick }: Props) => {
  const router = useRouter();
  const [addMember] = useAddTeamMemberMutation();
  return (
    <Modal
      header="Invite Someone"
      extraStyle={{ height: "35%" }}
      onClick={onClick}
      open={open}
    >
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
          <Form className="w-full h-full">
            <InputField
              name="email"
              label="User's email"
              placeholder="User's email"
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

export default InvitePeopleModal;
