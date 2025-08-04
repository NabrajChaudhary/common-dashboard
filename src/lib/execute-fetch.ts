import { NEXT_PUBLIC_API_URL } from "@/constants/index.constants";

export const executeFetch = async (
  url: `/${string}`,
  init?: RequestInit
): Promise<Response> => {
  console.log(`${NEXT_PUBLIC_API_URL}${url}`);

  const response = await fetch(`${NEXT_PUBLIC_API_URL}${url}`, init);
  return response;
};
