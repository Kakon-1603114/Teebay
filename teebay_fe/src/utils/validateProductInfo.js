import { toast } from "react-toastify";


export const validateProductInfo = (productInfo) => {
  if (productInfo.title === "") {
    toast.warning("Please provide a title for your product", {
      toastId: "title",
    });
    return false;
  }
  if (productInfo.description === "") {
    toast.warning("Please provide a description for your product", {
      toastId: "description",
    });
    return false;
  }
  if (isNaN(productInfo.price)) {
    toast.warning("Please provide a valid price for your product", {
      toastId: "price",
    });
    return false;
  }
  if (isNaN(productInfo.rent)) {
    toast.warning("Please provide a valid rent for your product", {
      toastId: "rent",
    });
    return false;
  }
  if (productInfo.rent_type === "") {
    toast.warning("Please provide a rent type for your product", {
      toastId: "rent_type",
    });
    return false;
  }
  if (productInfo.categories.length === 0) {
    toast.warning("Please provide a category for your product", {
      toastId: "categories",
    });
    return false;
  }
  return true;
};
