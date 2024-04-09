import React, { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Product from "./Product";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_LIST_OF_USER } from "../graphql/queries";

const SellerComponent = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_PRODUCT_LIST_OF_USER);
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    if (data?.getProductListOfUser) {
      setProductList(data.getProductListOfUser);
    }
  }, [data]);
  return (
    <>
      <h1 className="text-4xl text-gray-600 tracking-tighter">My Products</h1>
      {loading ? (
        <FiLoader className="animate-spin text-4xl text-gray-600 h-full" />
      ) : error ? (
        <p className="text-red-500 text-xl mt-10">{error.message}</p>
      ) : (
        <div className="product-container w-[90%] mt-5 overflow-scroll custom-scrollbar">
          {productList.map((product) => (
            <Product
              key={product.id}
              productInfo={product}
              from = "seller"
            />
          ))}
        </div>
      )}
      <span
        className={`flex justify-end w-[90%] mr-12 ${
          (error || loading) && "hidden"}
          ${productList.length === 0 && "justify-center items-center gap-4 flex-col mr-0"}
        `}>
        {productList.length === 0 &&
          "You have not added any products yet. Add a product to get started."}
        <br />
        
        <Button
          onclick={() => {
            navigate("/add-product");
          }}
          classname={`bg-slate-500 text-white px-4 py-2 rounded-md }`}
          text={"Add Product"}
        />
      </span>
    </>
  );
};

export default SellerComponent;
