import { executeFetch } from "@/lib/execute-fetch";
import { notFound } from "next/navigation";
import { RooomsResponseType } from "../types/index.types";

export const fetchAllRooms = async () => {
  const response = await executeFetch("/room/all/");
  if (!response.ok) {
    return notFound();
  }

  return (await response.json()) as RooomsResponseType;
};
