/* eslint-disable jsx-a11y/label-has-associated-control */
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  MemberSnippetFragment,
  TeamSnippetFragment,
  TeamSnippetFragmentDoc,
  useGetOrCreateChannelMutation,
} from "../../../generated/graphql";
import Button from "../../Button";
import Modal from "../../Modal/Modal";
import ModalFooter from "../../Modal/ModalFooter";
import { textFieldStyle } from "../../utils/InputField";
import MultiSelectUsers from "../MultiSelectUsers";
import { handleChangeMemberOnSelect } from "./CreateChannelModal";

const updateCacheAfterInvite = (teamId, cache, _data) => {
  const id = `Team:${teamId}`;
  const fragmentName = "TeamSnippet";
  const fragment = cache.readFragment({
    id,
    fragment: TeamSnippetFragmentDoc,
    fragmentName,
  }) as TeamSnippetFragment;
  const newChannel = {
    ..._data.getOrCreateChannel.channel,
    dm: true,
    teamId,
  };

  cache.writeFragment({
    id,
    fragmentName,
    fragment: TeamSnippetFragmentDoc,
    data: {
      channels: [
        ...fragment.channels,
        { ...newChannel, __typename: "Channel" },
      ],
    },
  });
};

interface Props {
  open: boolean;
  onClose: () => void;
  data: MemberSnippetFragment[];
  teamId: number;
}

const DirectMessageModal: React.FC<Props> = ({
  open,
  onClose,
  data,
  teamId,
}) => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [getOrCreateChannel] = useGetOrCreateChannelMutation();

  return (
    <Modal
      header="Direct Message"
      extraStyle={{ height: "25%" }}
      onClick={onClose}
      open={open}
    >
      <Formik
        initialValues={{ members: [] }}
        onSubmit={async (values) => {
          setError(null);
          const members = [];
          values.members.forEach((m) => members.push(m.value));

          const { data: mutationData } = await getOrCreateChannel({
            variables: { input: { teamId, members } },
            update: (cache, { data: _data }) => {
              const errors = _data.getOrCreateChannel.errors;
              if (errors) return;
              updateCacheAfterInvite(teamId, cache, _data);
            },
          });

          const {
            getOrCreateChannel: { errors },
          } = mutationData;
          if (errors && errors[0].field === "members") {
            setError(errors[0].message);
          } else if (mutationData.getOrCreateChannel?.channel) {
            router.push(
              `/team/view/${teamId}/${mutationData.getOrCreateChannel.channel.id}`
            );
            onClose();
          }
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <div className="mt-5">
              <MultiSelectUsers
                data={data}
                onChange={(e) => handleChangeMemberOnSelect(e, setFieldValue)}
                placeholder="select members to invite"
              />
              {error && <div className={textFieldStyle.error}>{error}</div>}
            </div>
            <ModalFooter mt="mt-10">
              <Button
                extraClassName="mr-4"
                borderRadius="lg"
                variant="primaryDark"
                loading={isSubmitting}
                type="submit"
                disabled={isSubmitting}
              >
                Start Chat
              </Button>
              <Button
                borderRadius="lg"
                disabled={isSubmitting}
                onClick={onClose}
                variant="transparent"
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
