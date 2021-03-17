import React from "react";

interface Props {
  checked: boolean;
  label: string;
  onChange: () => void;
}

const Checkbox: React.FC<Props> = ({ checked, label, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        checked={checked}
        onChange={onChange}
        type="checkbox"
        className="form-checkbox form-checkbox-border text-purple-500"
      />
      <label className="ml-2">{label}</label>
    </div>
  );
};

export default Checkbox;
