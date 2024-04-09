import React from "react";
import { FiLoader } from "react-icons/fi";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <FiLoader className="animate-spin text-4xl text-gray-600" />
    </div>
  );
};

export default Loading;
