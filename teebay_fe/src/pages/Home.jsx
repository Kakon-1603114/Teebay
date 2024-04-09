import { useQuery } from "@apollo/client";
import React, { useContext, useEffect } from "react";
import { FiLoader } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Product from "../components/Product";
import { GET_PRODUCT_LIST_OF_USER } from "../graphql/queries";
import Button from "../ui/Button";
import ConfirmationModal from "../ui/modals/ConfirmationModal";
import SuccessModal from "../ui/modals/SuccessModal";
import SellerComponent from "../components/SellerComponent";
import CustomerComponent from "../components/CustomerComponent";
import { AuthContext } from "../context/authContext";

const Home = () => {

  const { isSeller } = useContext(AuthContext);



  return (
    <main className="w-full flex items-center h-full">
    <div className="container mx-auto flex flex-col items-center h-[750px] gap-4">
      {isSeller ? (
          <SellerComponent />
      ) : (
        <CustomerComponent /> 
      )}
      </div>
      <ConfirmationModal />
      <SuccessModal />
    </main>
  );
};

export default Home;
