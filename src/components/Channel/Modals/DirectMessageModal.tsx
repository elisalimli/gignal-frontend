/* eslint-disable jsx-a11y/label-has-associated-control */
import Downshift from "downshift";
import { useRouter } from "next/router";
import React from "react";
import { MemberSnippetFragment } from "../../../generated/graphql";
import Button from "../../Button";
import Modal from "../../Modal/Modal";
import { textFieldStyle } from "../../utils/InputField";
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

  const handleOnChange = (selection: MemberSnippetFragment) => {
    router.push(`/team/user/${teamId}/${selection.user.id}`);
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
        <Downshift
          onChange={(selection) => handleOnChange(selection)}
          itemToString={(item: MemberSnippetFragment) => {
            return item ? item.user.username : "";
          }}
        >
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
            getRootProps,
          }) => (
            <div className="flex flex-col">
              <div
                style={{ margin: "15px 0px 10px 0px" }}
                {...getRootProps({}, { suppressRefError: true })}
              >
                <input
                  className={textFieldStyle.input}
                  {...(getInputProps() as any)}
                  name="name"
                  placeholder="user name"
                />
              </div>
              <ul {...getMenuProps()}>
                {isOpen
                  ? data
                      .filter(
                        (member) =>
                          !inputValue ||
                          member.user.username.includes(inputValue)
                      )
                      .map((item, index) => (
                        <li
                          {...getItemProps({
                            key: item.id,
                            index,
                            item,
                          })}
                          className={`cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
                            highlightedIndex === index ? "bg-gray-300" : ""
                          } ${
                            selectedItem === item ? "font-bold" : "font-normal"
                          }`}
                        >
                          {item.user.username}
                        </li>
                      ))
                  : null}
              </ul>
            </div>
          )}
        </Downshift>
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
