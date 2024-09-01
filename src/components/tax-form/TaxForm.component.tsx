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
import { getTaxBracketBreakdown } from "@/components/tax-form/utils";
import dynamic from "next/dynamic";
import ErrorComponent from "@/components/error/error.component";

/** This library doesn't play well with SSR, loading in the client */
const TaxChart = dynamic(
  () => import("@/components/tax-form/TaxChart.component"),
  { ssr: false },
);

/**
 *  Tax Form component is in charge of orchestrating state and display for the form and the results of the calculations.
 */
const TaxFormComponent: React.FC = () => {
  const t = useTranslations();

  /** Leverage hook forms for state management in forms, often better than handcrafted solutions */
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
    /** The client will cache locally each year, instead of sending a fetch on every selection change, lasts for a minute */
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

  /**
   * Some people like to wrap these render function variables into useMemo, I think this should not be the default,
   *  as memoizing some of these items is more costly in the first render than they are to simply recalculate every time
   */
  const chartData =
    submittedSalary && taxBracketData
      ? getTaxBracketBreakdown(submittedSalary, taxBracketData)
      : null;

  const totalTax = chartData
    ? chartData.reduce((acc, item) => acc + item.tax, 0)
    : 0;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center w-1/2"
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
      {chartData ? (
        <>
          <TaxChart data={chartData} />
          <p className="mt-4 text-lg">
            {t("totalTaxToPay")}: {totalTax.toFixed(2)}
          </p>
        </>
      ) : null}
    </form>
  );
};

export default TaxFormComponent;
