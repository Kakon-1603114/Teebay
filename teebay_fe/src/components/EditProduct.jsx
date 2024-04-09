import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";
import CategoryInputs from "../components/CategoryInputs";
import PriceInput from "../components/PriceInput";
import { UPDATE_PRODUCT } from "../graphql/mutations";
import Button from "../ui/Button";
import { validateProductInfo } from "../utils/validateProductInfo";
import NotFound from "../pages/NotFound"



const EditProduct = ({ productInfo, loading , isSeller}) => {
  const [hasChanges, setHasChanges] = useState(false);
  const [product, setProduct] = useState({});

  const [updateProduct, { data: uData, loading: uLoading, error: uError }] =
    useMutation(UPDATE_PRODUCT);

    useEffect(() => {
    if(!isSeller){
        console.log("not seller");
        return <NotFound />
    }
    }, [isSeller])

  useEffect(() => {
    if (uData?.updateProduct) {
      setProduct(uData.updateProduct);
      toast.success("Product updated successfully", {
        toastId: "update-product",
      });
    }
  }, [uData]);

  useEffect(() => {
    if (productInfo) {
      setProduct(productInfo);
    }
  }, [productInfo]);

  // Find the specific product by its id in the cached data

  useEffect(() => {
    // check product is not equal to the cached product
    if (JSON.stringify(product) !== JSON.stringify(productInfo)) {
      // if not equal, set hasChanges to true
      setHasChanges(true);
    } else {
      // if equal, set hasChanges to false
      setHasChanges(false);
    }
  }, [product, productInfo]);

  const handleUpdate = () => {
    if (validateProductInfo(product)) {
      updateProduct({
        variables: {
          id: product.id,
          input: {
            title: product.title,
            description: product.description,
            price: product.price,
            rent: product.rent,
            rent_type: product.rent_type,
            categories: product.categories,
          },
        },
      });
    }
  };

  if(uError){
    toast.error(uError.message, {
        toastId: "update-product-error",
        });
    }


  return (
    <div className="container mx-auto flex flex-col items-center">
      {loading ? (
        <FiLoader className="text-4xl animate-spin" />
      ) : (
        <div className="product-details  xl:w-[800px] mt-5  p-8 flex flex-col gap-4">
          <span className="w-full flex flex-col gap-2">
            <p>Title</p>
            <input
              type="text"
              className="w-full border-2 p-2 rounded outline-gray-400"
              onChange={(e) => {
                setProduct({ ...product, title: e.target.value });
              }}
              value={product?.title ? product.title : ""}
            />
          </span>
          <div className="w-full flex flex-col gap-2">
            <p>Categories</p>
            <CategoryInputs
              productInfo={product}
              setProductInfo={setProduct}
            />
          </div>
          <span className="w-full flex flex-col gap-2">
            <p>Description</p>
            <textarea
              className="w-full border-2 p-2 rounded outline-gray-400 custom-scrollbar h-56"
              onChange={(e) => {
                setProduct({ ...product, description: e.target.value });
              }}
              value={product?.description}
            />
          </span>
          <PriceInput
            productInfo={product}
            setProductInfo={setProduct}
          />
          <span className="w-full flex justify-end">
            <Button
              onclick={() => {
                handleUpdate();
              }}
              text={"Save Changes"}
              classname={`text-gray-500 px-4 py-2 rounded-md border  hover:text-white ${
                hasChanges
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "hover:bg-slate-500"
              }`}
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default EditProduct;
