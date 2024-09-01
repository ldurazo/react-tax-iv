"use client";

import React from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
}

/**
 * General purpose atomic button
 */
const Button: React.FC<ButtonProps> = ({ type, disabled, children }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`shadow ${disabled ? "bg-gray-400" : "bg-purple-500 hover:bg-purple-400 focus:shadow-outline"} md:m-4 focus:outline-none text-white font-bold py-2 px-4 rounded`}
    >
      {children}
    </button>
  );
};

export default Button;
