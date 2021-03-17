/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRouter } from "next/router";
import React from "react";
import Select from "react-select";
import { MemberSnippetFragment } from "../../../generated/graphql";
import Button from "../../Button";
import Modal from "../../Modal/Modal";
import ModalFooter from "../../Modal/ModalFooter";

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

  const handleOnChange = (e) => {
    router.push(`/team/user/${teamId}/${e.value}`);
    onClick();
  };

  return (
    <Modal
      header="Direct Message"
      extraStyle={{ height: "35%" }}
      onClick={onClick}
      open={open}
    >
      <div className="h-full flex flex-col w-full ">
        <Select
          onChange={handleOnChange}
          placeholder="user name"
          options={data.map((i) => ({
            value: i.user.id,
            label: i.user.username,
          }))}
        />

        <ModalFooter>
          <Button borderRadius="lg" variant="outline">
            Close
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
};

export default DirectMessageModal;
