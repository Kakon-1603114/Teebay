import React, {useState} from "react";
import { LuChevronsUpDown } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import ListItemModal from "../ui/modals/ListItemModal";


const CategoryInputs = ({productInfo, setProductInfo}) => {
  const [categoryModal, setCategoryModal] = useState(false);
  const listItems = [
    { id: "1", name: "ELECTRONICS" },
    { id: "2", name: "FURNITURE" },
    { id: "3", name: "HOME_APPLIANCES" },
    { id: "4", name: "SPORTING_GOODS" },
    { id: "5", name: "OUTDOOR" },
    { id: "6", name: "TOYS" },
  ];
  const handleSelection = (item) => {
    if (productInfo.categories.includes(item.name)) {
      // remove the item from the list
      setProductInfo({
        ...productInfo,
        categories: productInfo.categories.filter(
          (category) => category !== item.name
        ),
      });
    } else {
      // add the item to the list
      setProductInfo({
        ...productInfo,
        categories: [...productInfo.categories, item.name],
      });
    }

    setCategoryModal(false);
  };
  return (
    <div className="w-full border-2 p-3 rounded outline-gray-400 flex justify-between items-center relative">
      <span className="flex flex-wrap gap-y-2">
        {productInfo?.categories?.map((category, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded px-3 py-1 text-sm  text-gray-700 mr-2 capitalize">
            {category.split("_").join(" ")}
            <RxCross2
              onClick={() => {
                setProductInfo({
                  ...productInfo,
                  categories: productInfo?.categories?.filter(
                    (cat) => cat !== category
                  ),
                });
              }}
              className="inline-block text-gray-600 ml-2 cursor-pointer text-lg"
            />
          </span>
        ))}
      </span>
      {/* Select button to select other categories */}
      <LuChevronsUpDown
        onClick={() => {
          setCategoryModal(!categoryModal);
        }}
        className="inline-block text-gray-600 ml-2 cursor-pointer text-xl"
      />
      <ListItemModal
        trigger={categoryModal}
        setTrigger={setCategoryModal}
        items={listItems}
        triggerFunction={handleSelection}
        cname={"w-[220px] top-10 right-0"}
        selectedItems={productInfo?.categories}
      />
    </div>
  );
};

export default CategoryInputs;
