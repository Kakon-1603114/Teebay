import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Password = ({ setPassword, text }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="relative w-full">
      <input
      maxLength={50}
      minLength={8}
        onChange={(e) => setPassword(e.target.value)}
        type={showPassword ? "text" : "password"}
        placeholder={text}
        className="border-2 px-4 py-2 outline-none rounded w-full pr-12" // Added pr-12 for button spacing
      />
      <span
        onClick={togglePasswordVisibility}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer">
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
  );
};

export default Password;
