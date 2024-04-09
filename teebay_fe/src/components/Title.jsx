import React from "react";

const Title = ({ productInfo, setProductInfo }) => {
  return (
    <span className="w-full flex flex-col gap-5">
      <p className="text-2xl font-semibold text-center">
        Select a title for your product
      </p>
      <input
        onChange={(e) => {
            setProductInfo({ ...productInfo, title: e.target.value });
        }}
        value={productInfo.title}
        type="text"
        className="w-full border-2 p-2 rounded outline-gray-400"
      />
    </span>
  );
};

export default Title;
