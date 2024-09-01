import { TAX_BRACKET_ROUTES } from "@/api/constants";

export interface FormData {
  numberInput: number;
  yearSelect: keyof typeof TAX_BRACKET_ROUTES;
}

interface TaxBracket {
  min: number;
  max?: number;
  rate: number;
}

export interface TaxBrackets {
  tax_brackets: TaxBracket[];
}

export interface TaxBreakdown {
  name: string;
  tax: number;
}
