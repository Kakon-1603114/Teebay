import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import Product from "../components/Product";
import {
  GET_PRODUCTS_BY_TYPE,
  GET_USERS_PRODUCTS_BY_TYPE,
} from "../graphql/queries";

const getType = (active) => {
  switch (active) {
    case 1:
      return "buy";
    case 2:
      return "buy";
    case 3:
      return "rent";
    case 4:
      return "rent";

    default:
      return "buy";
  }
};
const buttons = ["bought", "sold", "borrowed", "lent"];

const Transections = () => {
  const [active, setActive] = useState(1);
  const [productList, setProductList] = useState([]);
  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_TYPE, {
    variables: {
      type: getType(active),
    }, // Pass the 'type' variable to the query
    skip: active !== 1 && active !== 3, // Skip the query if the 'type' is not 'buy' or 'lent'
  });
  const {
    loading: loading2,
    error: error2,
    data: data2,
  } = useQuery(GET_USERS_PRODUCTS_BY_TYPE, {
    variables: {
      type: getType(active),
    }, // Pass the 'type' variable to the query
    skip: active !== 2 && active !== 4, // Skip the query if the 'type' is not 'buy' or 'lent'
  });
  useEffect(() => {
    if (data) {
      setProductList(data.getProductsByType);
    }
    if (data2) {
      setProductList(data2.getUsersProductByType);
    }
  }, [data, data2]);

  return (
    <div className="w-full">
      <section className="w-full h-16 flex flex-between justify-center items-center gap-4 text-xl">
        {buttons?.map((button, index) => (
          <button
            key={index}
            onClick={() => setActive(index + 1)}
            className={` ${
              active === index + 1
                ? "border-b-4 border-b-[#6861f5] text-[#6861f5]"
                : "text-gray-600"
            } flex-1 justify-center text-center  p-2 transition-all duration-100 capitalize`}>
            {button}
          </button>
        ))}
      </section>
      <section className="container mx-auto flex flex-col items-center h-[750px] gap-4">
        {loading || loading2 ? (
          <FiLoader className="animate-spin text-4xl text-gray-600 h-full" />
        ) : error || error2 ? (
          <p className="text-red-500 text-xl mt-10">{error.message}</p>
        ) : (
          <div className="product-container w-[90%] mt-5 overflow-scroll custom-scrollbar justify-center items-center">
            {productList?.map((item, index) => (
              <Product
                key={index}
                productInfo={item?.product}
                from="transactions"
              />
            ))}
            {productList?.length === 0 && (
              <p className="text-gray-600 text-xl mt-10 text-center">
                Sorry, we could not find any products here.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Transections;
