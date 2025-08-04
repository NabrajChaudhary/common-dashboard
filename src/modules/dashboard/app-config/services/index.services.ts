import { executeFetch } from "@/lib/execute-fetch";
import { notFound } from "next/navigation";
import { Meta } from "../types/index.types";

export const fetchMetaData = async () => {
  const response = await executeFetch("/site-meta/");
  if (!response.ok) {
    return notFound();
  }

  return (await response.json()) as { meta: Meta };
};
