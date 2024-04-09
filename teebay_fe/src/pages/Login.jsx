import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/authContext";
import { LOGIN_USER } from "../graphql/mutations";
import AuthLayout from "../ui/AuthLayout";
import Button from "../ui/Button";
import Password from "../ui/Password";
import Loading from "../components/Loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const [LoginUser, { data, loading, error }] = useMutation(LOGIN_USER);

  const validateData = () => {
    if (email === "") {
      toast.error("Email cannot be empty", {
        toastId: "email",
      });
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateData()) {
      try {
        const { data, loading } = await LoginUser({
          variables: {
            input: {
              email,
              password,
            },
          },
        });
        context.login(data.loginUser);
        navigate("/");
      } catch (error) {
        toast.error(error.message, {
          toastId: "login",
        });
      }
    }
  };

  if(loading) return <Loading />

  return (
    <AuthLayout
      heading={"Sign In"}
      classname={"xl:w-[750px] md:w-[650px] w-full border-2 h-[500px]"}>
      <form
        onSubmit={handleLogin}
        className="flex flex-col justify-center items-center p-6 gap-8 w-[80%]">
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          className="border-2 px-4 py-2 outline-none rounded w-full"></input>
        <Password
          setPassword={setPassword}
          text="Password"
        />
        <Button
          text="Sign In"
          classname={
            "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-36"
          }
        />
      </form>
      <div className="flex gap-3">
        <p>Don't have an account? </p>
        <a
          href="/register"
          className="
        text-blue-500 hover:text-blue-600 font-semibold
        ">
          Sign Up
        </a>
      </div>
    </AuthLayout>
  );
};

export default Login;
