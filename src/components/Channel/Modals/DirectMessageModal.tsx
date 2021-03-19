/* eslint-disable jsx-a11y/label-has-associated-control */
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React from "react";
import Select from "react-select";
import {
  MemberSnippetFragment,
  useGetOrCreateChannelMutation,
} from "../../../generated/graphql";
import { useGetIdFromUrl } from "../../../utils/hooks/useGetIdFromUrl";
import { toErrorMap } from "../../../utils/toErrorMap";
import Button from "../../Button";
import Checkbox from "../../Checkbox";
import Modal from "../../Modal/Modal";
import ModalFooter from "../../Modal/ModalFooter";
import InputField from "../../utils/InputField";
import MultiSelectUsers from "../MultiSelectUsers";
import { handleChangeMemberOnSelect } from "./CreateChannelModal";

interface Props {
  open: boolean;
  onClick: () => void;
  data: MemberSnippetFragment[];
  teamId: number;
}

const DirectMessageModal: React.FC<Props> = ({
  open,
  onClick,
  data,
  teamId,
}) => {
  const router = useRouter();
  const [getOrCreateChannel] = useGetOrCreateChannelMutation();

  const handleOnChange = (e) => {
    router.push(`/team/user/${teamId}/${e.value}`);
    onClick();
  };

  return (
    <Modal
      header="Direct Message"
      extraStyle={{ height: "25%" }}
      onClick={onClick}
      open={open}
    >
      <Formik
        initialValues={{ members: [] }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);

          const members = [];

          values.members.forEach((m) => members.push(m.value));

          console.log("members", members);
          const res = await getOrCreateChannel({
            variables: { input: { teamId, members } },
          });
          console.log("res", res);
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <MultiSelectUsers
              data={data}
              onChange={(e) => handleChangeMemberOnSelect(e, setFieldValue)}
              placeholder="select members to invite"
            />
            <ModalFooter>
              <Button
                extraClassName="mr-4 "
                borderRadius="lg"
                variant="solid"
                loading={isSubmitting}
                type="submit"
                disabled={isSubmitting}
              >
                Start Chat
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

export default DirectMessageModal;
