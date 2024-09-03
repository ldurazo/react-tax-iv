import { getTaxBracketBreakdown } from "./utils";
import { describe, expect, it } from "@jest/globals";
import { TaxBrackets } from "@/components/tax-form/types";

const firstBracket: TaxBrackets = {
  tax_brackets: [
    { max: 50197, min: 0, rate: 0.15 },
    { max: 100392, min: 50197, rate: 0.205 },
    { max: 155625, min: 100392, rate: 0.26 },
    { max: 221708, min: 155625, rate: 0.29 },
    { min: 221708, rate: 0.33 },
  ],
};

const secondBracket: TaxBrackets = {
  tax_brackets: [
    { max: 49020, min: 0, rate: 0.15 },
    { max: 98040, min: 49020, rate: 0.205 },
    { max: 151978, min: 98040, rate: 0.26 },
    { max: 216511, min: 151978, rate: 0.29 },
    { min: 216511, rate: 0.33 },
  ],
};

const thirdBracket: TaxBrackets = {
  tax_brackets: [
    { max: 48535, min: 0, rate: 0.15 },
    { max: 97069, min: 48535, rate: 0.205 },
    { max: 150473, min: 97069, rate: 0.26 },
    { max: 214368, min: 150473, rate: 0.29 },
    { min: 214368, rate: 0.33 },
  ],
};

const fourthBracket: TaxBrackets = {
  tax_brackets: [
    { max: 47630, min: 0, rate: 0.15 },
    { max: 95259, min: 47630, rate: 0.205 },
    { max: 147667, min: 95259, rate: 0.26 },
    { max: 210371, min: 147667, rate: 0.29 },
    { min: 210371, rate: 0.33 },
  ],
};

describe("getTaxBracketBreakdown", () => {
  it("calculates tax breakdown correctly for firstBracket", () => {
    const salary = 60000;
    const result = getTaxBracketBreakdown(salary, firstBracket);
    expect(result).toEqual([
      { name: "At rate 15.0%", tax: 7529.55 },
      { name: "At rate 20.5%", tax: 2009.61 },
    ]);
  });

  it("calculates tax breakdown correctly for secondBracket", () => {
    const salary = 120000;
    const result = getTaxBracketBreakdown(salary, secondBracket);
    expect(result).toEqual([
      { name: "At rate 15.0%", tax: 7353 },
      { name: "At rate 20.5%", tax: 10049.1 },
      { name: "At rate 26.0%", tax: 5709.6 },
    ]);
  });

  it("calculates tax breakdown correctly for thirdBracket", () => {
    const salary = 200000;
    const result = getTaxBracketBreakdown(salary, thirdBracket);
    expect(result).toEqual([
      { name: "At rate 15.0%", tax: 7280.25 },
      { name: "At rate 20.5%", tax: 9949.47 },
      { name: "At rate 26.0%", tax: 13885.04 },
      { name: "At rate 29.0%", tax: 14362.83 },
    ]);
  });

  it("calculates tax breakdown correctly for fourthBracket", () => {
    const salary = 250000;
    const result = getTaxBracketBreakdown(salary, fourthBracket);
    expect(result).toEqual([
      { name: "At rate 15.0%", tax: 7144.5 },
      { name: "At rate 20.5%", tax: 9763.94 },
      { name: "At rate 26.0%", tax: 13626.08 },
      { name: "At rate 29.0%", tax: 18184.16 },
      { name: "At rate 33.0%", tax: 13077.57 },
    ]);
  });
});
