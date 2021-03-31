import React from "react";
import Select from "react-select";
import { MemberSnippetFragment } from "../../generated/graphql";
import theme from "../../../tailwind.config";

interface Props {
  data: MemberSnippetFragment[];
  onChange: (e) => void;
  placeholder: string;
}

const customStyles = {
  control: (provided, state) => ({
    display: "flex",
    border: state.isFocused
      ? `1px solid ${theme.theme.colors.purple[500]}`
      : "1px solid lightgray",
  }),
};

const MultiSelectUsers: React.FC<Props> = ({ data, onChange, placeholder }) => {
  return (
    <Select
      name="members"
      styles={customStyles}
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
