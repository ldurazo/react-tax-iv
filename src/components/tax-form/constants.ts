import { TAX_BRACKET_ROUTES } from "@/api/constants";

/**
 * Supported years by the API that provides tax margin calculation tables
 *  FIXME: I want to be fetched dynamically on app load, if the api tells me the years it supports!
 */
export const TAX_YEAR_OPTIONS: {
  value: keyof typeof TAX_BRACKET_ROUTES;
  label: string;
}[] = [
  { value: "2019", label: "2019" },
  { value: "2020", label: "2020" },
  { value: "2021", label: "2021" },
  { value: "2022", label: "2022" },
];

/** Always pick the most recent year until we can get it from a source of truth */
const sortedTaxYearOptions = [...TAX_YEAR_OPTIONS].sort((a, b) =>
  a.value.localeCompare(b.value),
);
export const DEFAULT_PREFETCH_YEAR: keyof typeof TAX_BRACKET_ROUTES =
  sortedTaxYearOptions[TAX_YEAR_OPTIONS.length - 1].value;
