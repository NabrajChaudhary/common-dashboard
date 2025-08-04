"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchAllRooms } from "../services/index.services";
import { Button } from "@/modules/core/components/ui/button";
import Link from "next/link";
import { DataTable } from "@/modules/core/components/DataTable";
import { roomsColumn } from "../components/column";
import { getQueryClient } from "@/lib/get-query-client";

const RooomsModule = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: fetchAllRooms,
  });

  if (isLoading) return <p>..Loading..</p>;

  return (
    <div>
      <Button variant="default">
        <Link href="/dashboard/rooms/add">Add Room</Link>
      </Button>
      <DataTable
        columns={roomsColumn}
        data={data?.data || []}
        initialPageSize={10}
      />
    </div>
  );
};

export default RooomsModule;
