"use client";

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 3, // API is, purposely ;) erratic.
      },
    },
  });

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  } else {
    /** Browser: make a new query client if we don't already have one
         This is very important, so we don't re-make a new client if React
         suspends during the initial render. This may not be needed if we
         have a suspense boundary BELOW the creation of the query client
         **/
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};

/**
 * All providers for client side components must register here.
 *
 * FIXME: If you add more, find a better home for React Query's utilities.
 */
const Providers = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
