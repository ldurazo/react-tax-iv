"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormData } from "@/components/tax-form/types";
import LabeledInput from "@/components/atoms/LabeledInput.component";
import LabeledSelect from "@/components/atoms/LabeledSelect.component";
import Button from "@/components/atoms/Button.component";
import { TAX_YEAR_OPTIONS } from "@/utils/constants";
import { useTranslations } from "next-intl";

const TaxFormComponent: React.FC = () => {
  const t = useTranslations();
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
        label="enterYourSalary"
        register={register("numberInput", {
          required: t("requiredField"),
          min: { value: 1, message: t("minimumValue") },
        })}
        error={errors.numberInput}
      />
      <LabeledSelect
        id="yearSelect"
        label="yearSelect"
        options={TAX_YEAR_OPTIONS}
        register={register("yearSelect", {
          required: t("requiredField"),
        })}
        error={errors.yearSelect}
      />

      <Button type="submit">{t("submit")}</Button>

      {submittedSalary ? (
        <div className="w-full max-w-md">
          <p className="text-sm text-gray-700">
            {t("submittedSalary")}: {submittedSalary}
          </p>
        </div>
      ) : null}
    </form>
  );
};

export default TaxFormComponent;
