import TaxFormComponent from "@/components/tax-form";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchTaxBrackets } from "@/api/taxes.api";
import { DEFAULT_PREFETCH_YEAR } from "@/components/tax-form/constants";

export default async function TaxCalculator() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["taxBrackets"],
    queryFn: () => fetchTaxBrackets(DEFAULT_PREFETCH_YEAR),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <TaxFormComponent />
      </main>
    </HydrationBoundary>
  );
}
