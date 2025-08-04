"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "@/lib/get-query-client";

export const ReactQueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={getQueryClient()}>
      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition="bottom-right"
        position="right"
      />
      {children}
    </QueryClientProvider>
  );
};
