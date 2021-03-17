import React, { ChangeEvent } from "react";
import Select from "react-select";
import { MemberSnippetFragment } from "../../generated/graphql";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

interface Props {
  data: MemberSnippetFragment[];
  onChange: (e) => void;
  placeholder: string;
}

const MultiSelectUsers: React.FC<Props> = ({ data, onChange, placeholder }) => {
  return (
    <Select
      onChange={onChange}
      placeholder={placeholder}
      isMulti
      closeMenuOnSelect={false}
      options={data.map((i) => ({
        value: i.user.id,
        label: i.user.username,
      }))}
    />
  );
};

export default MultiSelectUsers;
