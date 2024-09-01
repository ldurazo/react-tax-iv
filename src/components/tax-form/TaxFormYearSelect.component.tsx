"use client";

import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormData } from "@/components/tax-form/types";

interface TaxFormYearSelectProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

const TaxFormYearSelect: React.FC<TaxFormYearSelectProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="w-full max-w-md">
      <label
        htmlFor="yearSelect"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Year Select
      </label>
      <select
        id="yearSelect"
        defaultValue="2022"
        {...register("yearSelect", { required: "This field is required" })}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mb-4"
      >
        <option value="">Select a year</option>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
      </select>
      {errors.yearSelect && (
        <p className="text-sm text-red-600 mb-4">{errors.yearSelect.message}</p>
      )}
    </div>
  );
};

export default TaxFormYearSelect;
