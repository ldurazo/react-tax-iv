"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormData } from "@/components/tax-form/types";
import LabeledInput from "@/components/atoms/LabeledInput.component";
import LabeledSelect from "@/components/atoms/LabeledSelect.component";
import Button from "@/components/atoms/Button.component";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { fetchTaxBrackets } from "@/api/taxes.api";
import {
  DEFAULT_PREFETCH_YEAR,
  TAX_YEAR_OPTIONS,
} from "@/components/tax-form/constants";
import ErrorComponent from "@/components/error/error.component";

const TaxFormComponent: React.FC = () => {
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { yearSelect: DEFAULT_PREFETCH_YEAR },
  });

  const yearSelect = watch("yearSelect");

  const {
    data: taxBracketData,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["taxBrackets", yearSelect],
    queryFn: () => fetchTaxBrackets(getValues("yearSelect")),
  });

  const [submittedSalary, setSubmittedSalary] = useState<number | null>(null);

  if (error) {
    return <ErrorComponent />;
  }

  const onSubmit = (formData: FormData) => {
    setSubmittedSalary(formData.numberInput);
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
        defaultValue={DEFAULT_PREFETCH_YEAR}
        register={register("yearSelect", {
          required: t("requiredField"),
        })}
        error={errors.yearSelect}
      />
      <Button type="submit" disabled={isFetching || Boolean(error)}>
        {isFetching ? t("loading") : t("submit")}
      </Button>
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
