"use client";

import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData } from "@/components/tax-form/types";

interface TaxFormSalaryInputProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

const TaxFormSalaryInput: React.FC<TaxFormSalaryInputProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="w-full max-w-md">
      <label
        htmlFor="numberInput"
        className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
      >
        Enter your salary
      </label>
      <input
        id="numberInput"
        type="number"
        {...register("numberInput", {
          required: "This field is required",
          min: { value: 1, message: "Minimum value is 1" },
        })}
        className="border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      />
      {errors.numberInput && (
        <p className="text-sm text-red-600 mb-4">
          {errors.numberInput.message}
        </p>
      )}
    </div>
  );
};

export default TaxFormSalaryInput;
