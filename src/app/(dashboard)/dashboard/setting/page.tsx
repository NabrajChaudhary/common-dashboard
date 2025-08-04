import AppSettingModule from "@/modules/dashboard/app-config/pages";
import { fetchMetaData } from "@/modules/dashboard/app-config/services/index.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const SettingPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["site-meta"],
    queryFn: fetchMetaData,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AppSettingModule />
    </HydrationBoundary>
  );
};

export default SettingPage;
