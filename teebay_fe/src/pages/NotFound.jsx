import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-semibold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-8">
        The page you're looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
