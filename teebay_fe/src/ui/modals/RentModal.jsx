import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRentModal } from "../../redux/features/modal/modalSlice";
import ModalLayout from "../ModalLayout";

const RentModal = ({ rentalInfo, setRentalInfo, handleBuy }) => {
  const modalStore = useSelector((state) => state.modals);

  const dispatch = useDispatch();
  return (
    <ModalLayout modalState={modalStore.rentModal.isOpen}>
      <div
        className={`bg-white rounded-lg w-[500px] p-8 z-10 flex flex-col gap-10 ${
          !modalStore?.rentModal?.isOpen && "hidden"
        }`}>
        <h1 className="text-2xl font-medium text-gray-600">Rentel Period</h1>
        <div className="flex gap-4">
          <span className="flex flex-col gap-2">
            <label htmlFor="">From</label>
            <input
            min = {new Date().toISOString().split('T')[0]}
              onChange={(e) =>
                setRentalInfo({ ...rentalInfo, from: e.target.value })
              }
              type="date"
              name=""
              id=""
              className="border-2 border-gray-300 outline-none px-4 py-2"
            />
          </span>
          <span className="flex flex-col gap-2">
            <label htmlFor="">To</label>
            <input
            // restrict the date to be greater than the from date
            min={rentalInfo?.from}
              onChange={(e) =>
                setRentalInfo({ ...rentalInfo, to: e.target.value })
              }
              type="date"
              name=""
              id=""
              className="border-2 border-gray-300 outline-none px-4 py-2"
            />
          </span>
        </div>
        <div className="flex gap-4 mt-4 justify-end">
          <button
            onClick={() => dispatch(setRentModal(false))}
            className="bg-red-500 text-white px-4 py-2 rounded">
            Go Back
          </button>

          <button
            onClick={() => {
              handleBuy(false);
            }}
            disabled={!rentalInfo?.from || !rentalInfo?.to}
            className="bg-gray-500 text-white px-4 py-2 rounded">
            Confirm Rent
          </button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default RentModal;
