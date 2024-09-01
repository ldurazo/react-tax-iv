"use client";

import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useTranslations } from "next-intl";

interface LabeledSelectProps {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const LabeledSelect: React.FC<LabeledSelectProps> = ({
  id,
  label,
  options,
  register,
  error,
}) => {
  const t = useTranslations();

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-gray-600 font-bold md:text-left md:m-1"
      >
        {t(label)}
      </label>
      <select
        id={id}
        {...register}
        className={`border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none ${
          error ? "border-red-500" : "border-gray-200 focus:border-purple-500"
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {t(option.label)}
          </option>
        ))}
      </select>
      {error && error.message ? (
        <p className="text-sm text-red-600">{t(error.message)}</p>
      ) : null}
    </div>
  );
};

export default LabeledSelect;
