import { TaxBreakdown } from "@/components/tax-form/types";

interface TaxBracket {
  min: number;
  max?: number;
  rate: number;
}

interface TaxBrackets {
  tax_brackets: TaxBracket[];
}

export const getTaxBracketBreakdown = (
  salary: number,
  taxBrackets: TaxBrackets,
): TaxBreakdown[] => {
  const taxAmounts = calculateTax(salary, taxBrackets);

  /**
   * Technically doable with a reduce instead of a map.filter chain, but time complexity doesn't change, but much more readable.
   */
  return (
    taxAmounts
      /** Shape we want for the chart */
      .map((t, i) => {
        return {
          name: `Bracket ${i + 1}`,
          tax: t,
        };
      })
  );
};

const calculateTax = (salary: number, taxBrackets: TaxBrackets): number[] => {
  const taxAmounts: number[] = [];

  /** For each of the brackets we received... */
  for (const bracket of taxBrackets.tax_brackets) {
    /** Calculate a tax only if the salary made it into the bracket */
    if (salary > bracket.min) {
      /** Whatever is smaller, bracket or salary - the min, is the taxable amount */
      const taxableIncome = bracket.max
        ? Math.min(salary, bracket.max) - bracket.min
        : salary - bracket.min;
      /** Then simply multiply the rate by the delta calculated above */
      const tax = taxableIncome * bracket.rate;
      taxAmounts.push(tax);
    }
  }

  return taxAmounts;
};
