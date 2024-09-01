"use client";

import React from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, children }) => {
  return (
    <button
      type={type}
      className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline md:m-4 focus:outline-none text-white font-bold py-2 px-4 rounded"
    >
      {children}
    </button>
  );
};

export default Button;
