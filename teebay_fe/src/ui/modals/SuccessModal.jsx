import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalLayout from "../ModalLayout";
import { setSuccessModal } from "../../redux/features/modal/modalSlice";
import Button from "../Button";

const SuccessModal = () => {
  const modalStore = useSelector((state) => state.modals);
  const dispatch = useDispatch();
  return (
    <ModalLayout modalState={modalStore.successModal.isOpen}>
        <div
            className={`bg-white rounded-lg w-[500px] p-8 z-10 ${
                !modalStore.successModal.isOpen && "hidden"
            }`}>
            <h1 className="text-2xl text-center font-medium text-gray-600">
                {modalStore.successModal.message}
            </h1>
            <div className="flex gap-4 mt-4 justify-center">
                <Button
                    classname="bg-red-500 text-white px-8 py-2 rounded-md"
                    text="Okay"
                    onclick={() => {
                        dispatch(
                            setSuccessModal({
                                isOpen: false,
                                message: null,
                            })
                        );
                    }}
                />
            </div>
        </div>

    </ModalLayout>
  );
};

export default SuccessModal;
