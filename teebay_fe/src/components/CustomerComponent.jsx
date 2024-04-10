import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { GET_ALL_PRODUCTS } from "../graphql/queries";
import Product from "./Product";

const CustomerComponent = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    if (data?.getAllProducts) {
      setProductList(data.getAllProducts);
    }
  }, [data]);
  return (
    <>
      <h1 className="text-4xl mt-14 text-green-600 tracking-tighter">All Products</h1>
      {loading ? (
        <FiLoader className="animate-spin text-4xl text-gray-600 h-full" />
      ) : error ? (
        <p className="text-red-500 text-xl mt-10">{error.message}</p>
      ) : (
        <div className="product-container w-[90%] mt-5 overflow-scroll custom-scrollbar justify-center items-center">
          {productList.map((product) => (
            <Product
              key={product.id}
              productInfo={product}
              from="customer"
            />
          ))}
          {
            productList.length === 0 && (
              <p className="text-gray-600 text-xl mt-10 text-center">Sorry, we could not find any products. Try again later.</p>
            )
          }
        </div>
      )}
    </>
  );
};

export default CustomerComponent;
