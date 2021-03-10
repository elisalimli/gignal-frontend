import React from "react";

import Loader from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Loader type="TailSpin" color="#000" height={30} width={30} />
    </div>
  );
};

export default Loading;
