import React from "react";
import CategoryInputs from "./CategoryInputs";


const Categories = ({ productInfo, setProductInfo }) => {

  return (
    <div className="w-full flex flex-col gap-5">
      <p className="text-2xl font-semibold text-center">Select categories</p>
      <CategoryInputs productInfo = {productInfo} setProductInfo = {setProductInfo}/>
    </div>
  );
};

export default Categories;
