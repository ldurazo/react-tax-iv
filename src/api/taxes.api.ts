import { TAX_BRACKET_ROUTES } from "@/api/constants";

export const fetchTaxBrackets = async (
  year: keyof typeof TAX_BRACKET_ROUTES,
) => {
  const response = await fetch(TAX_BRACKET_ROUTES[year]);
  return await response.json();
};
