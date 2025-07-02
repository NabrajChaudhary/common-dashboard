import { DataTable } from "@/modules/core/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

type Props = {};

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "728ed52f1",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d422",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "728ed52fd",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d4222",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "728ed52fdf",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42as",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "728ed52fqw",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42gh",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
];

const DashboardModule = (props: Props) => {
  return <DataTable columns={columns} data={payments} />;
};

export default DashboardModule;
