import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Categories from "../components/Categories";
import Description from "../components/Description";
import Prices from "../components/Prices";
import Summery from "../components/Summery";
import Title from "../components/Title";
import { CREATE_PRODUCT } from "../graphql/mutations";
import Button from "../ui/Button";
import { validateProductInfo } from "../utils/validateProductInfo";
import Loading from "../components/Loading";

const AddProduct = () => {
  const [current, setCurrent] = useState(0);
  const [productInfo, setProductInfo] = useState({
    title: "",
    description: "",
    price: 0,
    rent: 0,
    rent_type: "",
    categories: [],
  });

  const navigate = useNavigate();

  const [CreateProduct, { data, loading, error }] = useMutation(CREATE_PRODUCT);

  const next = () => {
    if (current === 0 && productInfo.title === "") {
      toast.warning("Please provide a title for your product", {
        toastId: "title",
      });
      return;
    }
    if (current === 1 && productInfo.description === "") {
      toast.warning("Please provide a description for your product", {
        toastId: "description",
      });
      return;
    }
    if (current === 2 && productInfo.categories.length === 0) {
      toast.warning("Please provide a category for your product", {
        toastId: "categories",
      });
      return;
    }
    if (current === 3 && isNaN(productInfo.price.toString())) {
      toast.warning("Please provide a valid price for your product", {
        toastId: "price",
      });
      return;
    }
    if (current === 3 && isNaN(productInfo.rent.toString())) {
      toast.warning("Please provide a valid rent for your product", {
        toastId: "rent",
      });
      return;
    }
    if (current === 3 && productInfo.rent_type === "") {
      toast.warning("Please provide a rent type for your product", {
        toastId: "rent_type",
      });
      return;
    }
    setCurrent(current + 1);
  };
  const previous = () => {
    setCurrent(current - 1);
  };

  const item = [
    <Title
      productInfo={productInfo}
      setProductInfo={setProductInfo}
    />,
    <Description
      productInfo={productInfo}
      setProductInfo={setProductInfo}
    />,
    <Categories
      productInfo={productInfo}
      setProductInfo={setProductInfo}
    />,
    <Prices
      productInfo={productInfo}
      setProductInfo={setProductInfo}
    />,
    <Summery productInfo={productInfo} />,
  ];

  if(loading) {
    <Loading />
  }


  const handleSubmit = () => {
    if (validateProductInfo(productInfo)) {
      CreateProduct({
        variables: {
          input: productInfo,
        },
        refetchQueries: ["GetProductListOfUser"],
      })
        .then((res) => {
          toast.success("Product added successfully", {
            toastId: "product",
          });
          navigate("/");
        })
        .catch((err) => {
          toast.error(err.message, {
            toastId: "product",
          });
        });
    }
  };

  return (
    <main className="w-full flex items-center h-full">
      <div className="container mx-auto flex flex-col items-center h-[700px] overflow-auto justify-center">
        <div className="product-details  xl:w-[900px] lg:w-[90%] w-full overflow-scroll custom-scrollbar p-8 flex flex-col gap-5 text-gray-600 min-h-[400px]">
          {item[current]}
          <div
            className={`
        w-full flex gap-4 mt-4 ${
          current < 1 ? "justify-end" : "justify-between"
        }
        `}>
            <Button
              onclick={() => {
                previous();
              }}
              text={"Previous"}
              classname={`bg-slate-500 text-white px-4 py-2 rounded-md ${
                current < 1 && "hidden"
              }`}
            />
            <Button
              onclick={() => {
                current < 4 ? next() : handleSubmit();
              }}
              text={current < 4 ? "Next" : "Submit"}
              classname={`${
                current < 4 ? "bg-slate-500" : "bg-blue-500"
              } text-white px-4 py-2 rounded-md`}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddProduct;
