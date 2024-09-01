"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormData } from "@/components/tax-form/types";
import LabeledInput from "@/components/atoms/LabeledInput.component";
import LabeledSelect from "@/components/atoms/LabeledSelect.component";
import Button from "@/components/atoms/Button.component";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { fetchTaxBrackets } from "@/api/taxes.api";
import { TAX_YEAR_OPTIONS } from "@/components/tax-form/constants";

const TaxFormComponent: React.FC = () => {
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const yearSelect = watch("yearSelect");

  const { data: queryData, refetch } = useQuery({
    queryKey: ["taxBrackets"],
    queryFn: () => fetchTaxBrackets(getValues("yearSelect")),
  });

  const [submittedSalary, setSubmittedSalary] = useState<number | null>(null);

  const onSubmit = (data: FormData) => {
    setSubmittedSalary(data.numberInput);
  };

  useEffect(() => {
    if (yearSelect) {
      (async () => await refetch())();
    }
  }, [yearSelect, refetch]);

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
