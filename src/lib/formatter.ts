export const formatTime = (timeinSeconds: number) => {
  return timeinSeconds / 60;
};

export const formatDate = (dateString: string) => {
  if (dateString.includes("/")) return dateString; // Already formatted
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};
