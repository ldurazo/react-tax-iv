import { API_PATHS } from "@/api/constants";

export const fetchTaxBrackets = async () => {
  const response = await fetch(API_PATHS.YEAR_2021);
  return await response.json();
};
