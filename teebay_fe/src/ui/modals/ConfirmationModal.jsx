import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setConfirmationModal,
  setSuccessModal,
} from "../../redux/features/modal/modalSlice";
import Button from "../Button";
import ModalLayout from "../ModalLayout";

const ConfirmationModal = () => {
  const modalStore = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  return (
    <ModalLayout modalState={modalStore.confirmationModal.isOpen}>
      <div
        className={`bg-white rounded-lg w-[500px] p-8 z-10 ${
          !modalStore.confirmationModal.isOpen && "hidden"
        }`}>
        <h1 className="text-2xl font-medium text-gray-600">
          {modalStore.confirmationModal.message}
        </h1>
        <div className="flex gap-4 mt-4 float-right">
          <Button
            classname=" bg-gray-500 text-white px-8 py-2 rounded-md"
            text="Yes"
            onclick={() => {
              dispatch(
                setConfirmationModal({
                  isOpen: false,
                  message: null,
                  confirmed: true,
                  from: modalStore.confirmationModal.from,
                })
              );
            }}
          />
          <Button
            classname="bg-red-500 text-white px-8 py-2 rounded-md"
            text="No"
            onclick={() => {
              dispatch(
                setConfirmationModal({
                  isOpen: false,
                  message: null,
                  confirmed: false,
                  from: null,
                })
              );
            }}
          />
        </div>
      </div>
    </ModalLayout>
  );
};

export default ConfirmationModal;
