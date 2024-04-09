import { useApolloClient, useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { AiFillDownCircle, AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { AuthContext } from "../context/authContext";
import { TOGGLE_IS_SELLER } from "../graphql/mutations";
import Button from "./Button";

const Layout = ({ children }) => {
  const client = useApolloClient();

  const handleClearCache = () => {
    client.clearStore(); // Clear the Apollo Client cache
  };
  const { logout, user, isSeller, toggleIsSeller } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ToggleIsSellerMutaion, { loading }] = useMutation(TOGGLE_IS_SELLER);
  const [showNav, setShowNav] = React.useState(false);

  if (loading) return <Loading />;

  const toggleIsSellerHandler = async () => {
    try {
      const { data } = await ToggleIsSellerMutaion();
      toggleIsSeller(data.toggleIsSeller);
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex gap-4 p-2 w-full flex-col items-center">
      <header className="bg-light border shadow rounded-lg sticky top-0 h-[60px] flex items-center justify-between px-4 z-10 w-full bg-slate-50">
        <div className="flex items-center gap-x-10 justify-center">
          <h1
            onClick={() => {
              navigate("/");
            }}
            className={`
        text-2xl font-medium tracking-widest text-gray-600 cursor-pointer capitalize ${
          showNav && "xl:block lg:block md:block hidden"
        }`}>
            TeeBay | {localStorage.getItem("username")}
          </h1>
          <IoChevronBackCircleOutline
            onClick={() => {
              if (user && window.location.pathname !== "/") {
                window.history.back();
              }
            }}
            className="text-3xl text-gray-600 cursor-pointer mt-1"
          />
        </div>

        <div className="flex justify-center items-center xl:hidden lg:hidden md:hidden gap-4">
          {!showNav ? 
          <AiFillLeftCircle
            onClick={() => setShowNav(!showNav)}
            className="text-3xl text-gray-600 cursor-pointer"
          />
          :
          <AiFillRightCircle
            onClick={() => setShowNav(!showNav)}
            className="text-3xl text-gray-600 cursor-pointer"
          />
          }

          {showNav && (
            <span className="gap-x-4 flex">
              <button
                onClick={() => {
                  navigate("/transactions");
                }}
                className="text-gray-500 px-4 py-2 rounded-md border hover:bg-slate-500 hover:text-white">
                View Transactions
              </button>
              <Button
                onclick={toggleIsSellerHandler}
                text={isSeller ? "Seller Mode" : "Customer Mode"}
                classname={
                  "text-gray-500 px-4 py-2 rounded-md border hover:bg-slate-500 hover:text-white"
                }
              />
              <Button
                onclick={() => {
                  handleClearCache();
                  logout();
                }}
                text={"Log Out"}
                classname={"bg-red-500 text-white px-4 py-2 rounded-md"}
              />
            </span>
          )}
        </div>

        <span className="gap-x-4 xl:flex-row lg:flex-row xl:flex lg:flex md:flex hidden ">
          <button
            onClick={() => {
              navigate("/transactions");
            }}
            className="text-gray-500 px-4 py-2 rounded-md border hover:bg-slate-500 hover:text-white">
            View Transactions
          </button>
          <Button
            onclick={toggleIsSellerHandler}
            text={!isSeller ? "Seller Mode" : "Customer Mode"}
            classname={
              " text-gray-500 px-4 py-2 rounded-md border hover:bg-slate-500 hover:text-white"
            }
          />
          <Button
            onclick={() => {
              handleClearCache();
              logout();
            }}
            text={"Log Out"}
            classname={"bg-red-500 text-white px-4 py-2 rounded-md"}
          />
        </span>
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
