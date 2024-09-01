import { TAX_BRACKET_ROUTES } from "@/api/constants";

interface TaxApiErrors {
  errors: { code: string; message: string }[];
}

/**
 * Best guess attempt at catching general errors from the API
 */
function handleErrorsIfAny(response: Response) {
  if (!response.ok) {
    throw new Error("An unknown error has occurred");
  }
  const errors = (response as unknown as TaxApiErrors)?.errors;
  if (errors) {
    if (errors.length) {
      throw new Error(errors[0].code);
    }
    throw new Error("An unknown error has occurred");
  }
}

/**
 * GET request for tax bracket information.
 *  keyed by the year in the upstream cache utilities
 */
export const fetchTaxBrackets = async (
  year: keyof typeof TAX_BRACKET_ROUTES,
) => {
  const response = await fetch(TAX_BRACKET_ROUTES[year]);
  const result = await response.json();

  handleErrorsIfAny(response);

  return result;
};
