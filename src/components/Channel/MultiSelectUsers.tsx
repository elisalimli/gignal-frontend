import React from "react";
import Select from "react-select";
import { MemberSnippetFragment } from "../../generated/graphql";

interface Props {
  data: MemberSnippetFragment[];
  onChange: (e) => void;
  placeholder: string;
}

const MultiSelectUsers: React.FC<Props> = ({ data, onChange, placeholder }) => {
  return (
    <Select
      name="members"
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
