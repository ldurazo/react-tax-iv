import { TAX_BRACKET_ROUTES } from "@/api/constants";

export interface FormData {
  numberInput: number;
  yearSelect: keyof typeof TAX_BRACKET_ROUTES;
}

export interface TaxBreakdown {
  name: string;
  tax: number;
}
