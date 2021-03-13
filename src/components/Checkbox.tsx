import React from "react";

interface Props {
  checked: boolean;
  name: string;
  text: string;
}

const Checkbox: React.FC<Props> = ({ checked, name, text }) => {
  return (
    <div className="container">
      {text}
      <input
        name={name}
        type="checkbox"
        onChange={(e) => console.log(e.target.value)}
        checked={checked}
      />
      <span className="checkmark" />
    </div>
  );
};

export default Checkbox;
