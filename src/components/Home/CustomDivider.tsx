import React from "react";

const CustomDivider = () => {
  return (
    <div className="flex items-center justify-center">
      <span
        style={{ height: 3 }}
        className="inline-block w-5 bg-secondary-100 rounded-md ml-2"
      />
    </div>
  );
};

export default CustomDivider;
