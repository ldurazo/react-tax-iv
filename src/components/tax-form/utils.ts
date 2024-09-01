interface TaxBracket {
  min: number;
  max?: number;
  rate: number;
}

interface TaxBrackets {
  tax_brackets: TaxBracket[];
}

export const calculateTax = (
  salary: number,
  taxBrackets: TaxBrackets,
): number[] => {
  const taxAmounts: number[] = [];

  for (const bracket of taxBrackets.tax_brackets) {
    if (salary > bracket.min) {
      const taxableIncome = bracket.max
        ? Math.min(salary, bracket.max) - bracket.min
        : salary - bracket.min;
      const tax = taxableIncome * bracket.rate;
      taxAmounts.push(tax);
    } else {
      // TODO ldurazo: may not need this else logic
      taxAmounts.push(0);
    }
  }

  return taxAmounts;
};
