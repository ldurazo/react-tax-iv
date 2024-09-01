import TaxFormComponent from "@/components/tax-form";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchTaxBrackets } from "@/api/taxes.api";

export default async function TaxCalculator() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["taxBrackets"],
    queryFn: fetchTaxBrackets,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <TaxFormComponent />
      </main>
    </HydrationBoundary>
  );
}
