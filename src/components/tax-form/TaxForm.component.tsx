"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  numberInput: number;
  yearSelect: string;
}

const TaxFormComponent: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [submittedSalary, setSubmittedSalary] = useState<number | null>(null);

  const onSubmit = (data: FormData) => {
    setSubmittedSalary(data.numberInput);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center"
    >
      <div className="w-full max-w-md">
        <label
          htmlFor="numberInput"
          className="block text-sm font-medium text-gray-700 mb-1"
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
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mb-4"
        />
        {errors.numberInput && (
          <p className="text-sm text-red-600 mb-4">
            {errors.numberInput.message}
          </p>
        )}
      </div>

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
          <p className="text-sm text-red-600 mb-4">
            {errors.yearSelect.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full max-w-md px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
      >
        Submit
      </button>

      {submittedSalary !== null && (
        <div className="w-full max-w-md">
          <p className="text-sm text-gray-700">
            Submitted Salary: {submittedSalary}
          </p>
        </div>
      )}
    </form>
  );
};

export default TaxFormComponent;
