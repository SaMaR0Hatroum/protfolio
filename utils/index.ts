export function range(length: number) {
  return Array.from({ length })
    .fill(-1)
    .map((_, index) => index);
}

export const fetcher = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> => {
  const res = await fetch(input, init);
  return res.json();
};
