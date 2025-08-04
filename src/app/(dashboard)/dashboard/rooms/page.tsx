import { getQueryClient } from "@/lib/get-query-client";
import RooomsModule from "@/modules/dashboard/rooms/pages";
import { fetchAllRooms } from "@/modules/dashboard/rooms/services/index.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const RoomsPage = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["rooms"],
    queryFn: fetchAllRooms,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RooomsModule />
    </HydrationBoundary>
  );
};

export default RoomsPage;
