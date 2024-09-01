"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormData } from "@/components/tax-form/types";
import TaxFormSalaryInput from "./TaxFormSalaryInput.component";
import TaxFormYearSelect from "./TaxFormYearSelect.component";

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
      <TaxFormSalaryInput register={register} errors={errors} />
      <TaxFormYearSelect register={register} errors={errors} />

      <button
        type="submit"
        className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>

      {submittedSalary ? (
        <div className="w-full max-w-md">
          <p className="text-sm text-gray-700">
            Submitted Salary: {submittedSalary}
          </p>
        </div>
      ) : null}
    </form>
  );
};

export default TaxFormComponent;
