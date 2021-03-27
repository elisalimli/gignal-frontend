import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import {
  useCreateChannelMutation,
  useGetTeamMembersQuery,
} from "../../../generated/graphql";
import { useGetIdFromUrl } from "../../../utils/hooks/useGetIdFromUrl";
import { toErrorMap } from "../../../utils/toErrorMap";
import Button from "../../Button";
import Checkbox from "../../Checkbox";
import Modal from "../../Modal/Modal";
import ModalFooter from "../../Modal/ModalFooter";
import InputField from "../../utils/InputField";
import MultiSelectUsers from "../MultiSelectUsers";

interface Props {
  open: boolean;
  onClick: () => void;
  teamId: number;
  data: any;
}

export const handleChangeMemberOnSelect = (e, setFieldValue) => {
  setFieldValue("members", e);
};

const CreateChannelModal: React.FC<Props> = ({
  open,
  onClick,
  teamId,
  data,
}) => {
  const router = useRouter();
  const [createChannel] = useCreateChannelMutation();

  return (
    <Modal
      header="Create Channel"
      extraStyle={{ height: "30%" }}
      onClick={onClick}
      open={open}
    >
      <Formik
        initialValues={{ name: "", public: true, members: [] }}
        onSubmit={async (values, { setErrors }) => {
          const members = [];
          if (!values.public) {
            values.members.forEach((m) => members.push(m.value));
          }

          const res = await createChannel({
            variables: {
              input: {
                name: values.name,
                teamId: useGetIdFromUrl(router.query.teamId),
                isPublic: values.public,
                members,
              },
            },
            update: (cache) => {
              cache.evict({ fieldName: "team" });
            },
          });
          const { errors, channel } = res?.data?.createChannel;
          if (errors) setErrors(toErrorMap(errors));
          else if (channel) {
            onClick();
            const { id } = channel;
            router.push(`/team/view/${teamId}/${id}`);
          }
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <InputField
              name="name"
              label="Channel name"
              placeholder="Channel name"
            />
            <div className="mt-3 ml-1">
              <Checkbox
                onChange={() => setFieldValue("public", !values.public)}
                checked={!values.public}
                label="Private channel"
              />
            </div>
            {!values.public && (
              <MultiSelectUsers
                data={data}
                onChange={(e) => handleChangeMemberOnSelect(e, setFieldValue)}
                placeholder="select members to invite"
              />
            )}

            <ModalFooter>
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
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateChannelModal;
