export const createQueryString = (query: Record<string, unknown>) => {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value !== "all"
    ) {
      params.set(key, String(value));
    }
  });

  return params.toString();
};