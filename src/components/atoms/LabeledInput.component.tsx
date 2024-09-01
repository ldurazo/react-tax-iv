"use client";

import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useTranslations } from "next-intl";

interface LabeledInputProps {
  id: string;
  type: string;
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

/**
 * General purpose labeled input of various types
 */
const LabeledInput: React.FC<LabeledInputProps> = ({
  id,
  type,
  label,
  register,
  error,
}) => {
  const t = useTranslations();

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-gray-600 font-bold md:text-left mb-1 md:mb-1 pr-4"
      >
        {t(label)}
      </label>
      <input
        id={id}
        type={type}
        {...register}
        className={`border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none ${
          error ? "border-red-500" : "border-gray-200 focus:border-purple-500"
        }`}
      />
      {error && error.message ? (
        <p className="text-sm text-red-600">{error.message}</p>
      ) : null}
    </div>
  );
};

export default LabeledInput;
