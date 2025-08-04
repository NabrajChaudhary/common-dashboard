import { ColumnDef } from "@tanstack/react-table";
import { RoomType } from "../types/index.types";

export const roomsColumn: ColumnDef<RoomType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "bedType",
    header: "Bed Type",
  },
  {
    accessorKey: "pricePerNight",
    header: "Price Per Night",
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
  },
  {
    accessorKey: "isAvailable",
    header: "Available",
  },
];
