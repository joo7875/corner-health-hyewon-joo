import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const DEFAULT_REFETCH_INTERVAL = 60000; // 1 min

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchInterval: DEFAULT_REFETCH_INTERVAL,
    },
  },
});

function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default AppProvider;
