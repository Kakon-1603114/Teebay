import { useEffect } from "react";
import { useSelector } from "react-redux";

const useOutsideClickHandler = (ref, closingFunction) => {
  // check if an element which classname ins toast is clicked
  // if so, do not close the modal
  const isToastContainerPresent = () => {
    const toastContainer = document.querySelector(
      ".Toastify__toast-container.Toastify__toast-container--top-right"
    );
    return toastContainer !== null;
  };

  const modalStore = useSelector((store) => store.modals);
  useEffect(() => {
    const closeModal = (e) => {
      if (
        ref &&
        ref.current &&
        !ref.current.contains(e.target) &&
        !modalStore?.confirmationModal?.isOpen &&
        !isToastContainerPresent()
      ) {
        closingFunction();
      }
    };

    document.addEventListener("mousedown", closeModal);

    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, [ref, closingFunction]);
};

export default useOutsideClickHandler;
