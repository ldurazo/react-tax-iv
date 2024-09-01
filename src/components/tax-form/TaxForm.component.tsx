"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormData } from "@/components/tax-form/types";
import LabeledInput from "@/components/atoms/LabeledInput.component";
import LabeledSelect from "@/components/atoms/LabeledSelect.component";
import Button from "@/components/atoms/Button.component";
import { TAX_YEAR_OPTIONS } from "@/utils/constants";

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
      <LabeledInput
        id="numberInput"
        type="number"
        label="Enter your salary"
        register={register("numberInput", {
          required: "This field is required",
          min: { value: 1, message: "Minimum value is 1" },
        })}
        error={errors.numberInput}
      />
      <LabeledSelect
        id="yearSelect"
        label="Year Select"
        options={TAX_YEAR_OPTIONS}
        register={register("yearSelect", {
          required: "This field is required",
        })}
        error={errors.yearSelect}
      />

      <Button type="submit">Submit</Button>

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
