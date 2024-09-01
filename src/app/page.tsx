import TaxFormComponent from "@/components/tax-form";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchTaxBrackets } from "@/api/taxes.api";
import { DEFAULT_PREFETCH_YEAR } from "@/components/tax-form/constants";
import ErrorComponent from "@/components/error/error.component";

/**
 * Server side page that renders the Tax Form.
 */
export default async function TaxCalculator() {
  const queryClient = new QueryClient();

  /**
   * Pre-fetch and cache server side the latest year as the most likely use case for this calculator.
   */
  const { errors } = await queryClient.fetchQuery({
    queryKey: ["taxBrackets", DEFAULT_PREFETCH_YEAR],
    queryFn: () => fetchTaxBrackets(DEFAULT_PREFETCH_YEAR),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {errors ? <ErrorComponent /> : <TaxFormComponent />}
      </main>
    </HydrationBoundary>
  );
}
