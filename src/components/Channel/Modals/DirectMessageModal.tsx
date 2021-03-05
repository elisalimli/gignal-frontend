/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Input,
} from "@chakra-ui/react";
import Downshift from "downshift";
import { useRouter } from "next/router";
import React from "react";
import { MemberSnippetFragment } from "../../../generated/graphql";
import InputField from "../../utils/InputField";

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
    <Modal key="create-channel-modal" isOpen={open} onClose={onClick}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Direct Message</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
              <div>
                <div
                  style={{ margin: "15px 0px 10px 0px" }}
                  {...getRootProps({}, { suppressRefError: true })}
                >
                  <Input
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
                              style: {
                                listStyle: "none",

                                backgroundColor:
                                  highlightedIndex === index
                                    ? "rgba(0,0,0,.3)"
                                    : "lightgray",
                                fontWeight:
                                  selectedItem === item ? "bold" : "normal",
                                padding: 5,
                                color:
                                  highlightedIndex === index
                                    ? "white"
                                    : "black",
                              },
                            })}
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
            <Button onClick={onClick} variant="ghost">
              Close
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DirectMessageModal;
