"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TaxBreakdown } from "@/components/tax-form/types";

/**
 * Purpose of this chart is to more elegantly show the bracket breakdown of owed taxes.
 */
const TaxChart = (props: { data: TaxBreakdown[] }) => {
  const { data } = props;
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart layout="vertical" data={data}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />
        <Bar dataKey="tax" stackId="a" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TaxChart;
