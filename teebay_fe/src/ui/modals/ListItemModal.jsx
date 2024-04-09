import { RxCheckCircled } from "react-icons/rx";
import useOutsideClickHandler from "../../hooks/useOutsideClickHandler";
import { useRef } from "react";

const ListItemModal = ({
  trigger,
  setTrigger,
  items,
  triggerFunction,
  cname,
  selectedItems,
}) => {
  const modalRef = useRef(null);
  useOutsideClickHandler(modalRef, () => {
    setTrigger(false);
  });
  

  return (
    <div
      className={`absolute top-0 shadow-lg z-10 translate-all duration-200 ${cname} ${
        trigger ? "scale-100" : "scale-0"
      }
      ${cname}
      
    `}>
      <div
      ref={modalRef}
       className="flex flex-col gap-4 text-center bg-white rounded-b-lg shadow-lg p-2 overflow-y-auto custom-scrollbar">
        <div className="text-left flex flex-col text-sm text-gray-600 tracking-widest pb-2">
          {items?.map((item, index) => (
            <span
              onClick={() => {
                setTrigger(false);
                triggerFunction(item);
              }}
              key={index}
              className={` flex items-center hover:bg-gray-400 hover:text-white shadow-sm p-2 rounded cursor-pointer justify-between`}>
              <p
                key={index}
                className="">
                {item?.name?.split("_").join(" ")}
              </p>
              <RxCheckCircled
                className={`inline-block text-lg ${
                  !selectedItems?.includes(item?.name) && "hidden"
                }`}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListItemModal;
