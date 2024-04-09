import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CREATE_USER } from "../graphql/mutations";
import AuthLayout from "../ui/AuthLayout";
import Button from "../ui/Button";
import Password from "../ui/Password";
import Loading from "../components/Loading";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const checkPassword = () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        toastId: "password",
      });
      return false;
    }
    return true;
  };
  const validateData = () => {
    if (firstName === "") {
      toast.error("First name cannot be empty", {
        toastId: "firstName",
      });
      return false;
    }
    if (lastName === "") {
      toast.error("Last name cannot be empty", {
        toastId: "lastName",
      });
      return false;
    }
    if (address === "") {
      toast.error("Address cannot be empty", {
        toastId: "address",
      });
      return false;
    }
    if (email === "") {
      toast.error("Email cannot be empty", {
        toastId: "email",
      });
      return false;
    }
    if (phoneNumber === "") {
      toast.error("Phone number cannot be empty", {
        toastId: "phoneNumber",
      });
      return false;
    }
    return checkPassword();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateData()) {
      // Send data to backend
      try {
        const { data, loading } = await createUser({
          variables: {
            input: {
              firstname: firstName,
              lastname: lastName,
              password: password,
              email: email,
              address: address,
              phone: phoneNumber,
            },
          },
        });
        toast.success("Registration successful", {
          toastId: "register",
        });
        navigate("/login");
      } catch (error) {
        toast.error(error.message, {
          toastId: "register",
        });
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <AuthLayout
      heading={"Sign Up"}
      classname={"xl:w-[800px] md:w-[700px] w-full border-2 py-10"}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center px-3 py-5 gap-8 w-[80%]"
      >
        <div className="flex gap-4 w-full">
          <input
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="border-2 px-4 py-2 outline-none rounded w-full"
          />
          <input
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            placeholder="Last Name"
            className="border-2 px-4 py-2 outline-none rounded w-full"
          />
        </div>
        <input
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          className="border-2 px-4 py-2 outline-none rounded w-full"
        />
        <div className="flex gap-4 w-full">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="border-2 px-4 py-2 outline-none rounded w-full"
          />
          <input
            onChange={(e) => {
              // Take only number inputs
              const re = /^[0-9\b]+$/;
              if (e.target.value === "" || re.test(e.target.value)) {
                setPhoneNumber(e.target.value);
              }
            }}
            value={phoneNumber}
            type="phone"
            placeholder="Phone Number"
            className="border-2 px-4 py-2 outline-none rounded w-full"
          />
        </div>
        <Password setPassword={setPassword} text="Password" />
        <Password setPassword={setConfirmPassword} text="Confirm Password" />

        <Button
          text="Sign Up"
          classname={
            "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-36"
          }
        />
      </form>
      <div className="flex gap-3">
        <p>Already have an account? </p>
        <a
          href="/login"
          className="text-blue-500 hover:text-blue-600 font-semibold"
        >
          Sign In
        </a>
      </div>
    </AuthLayout>
  );
};

export default Register;
