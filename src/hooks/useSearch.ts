import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchPopularPhotos } from "../api/photoService";
export const useSearch = (query: string, page: number) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 800);
    return () => clearTimeout(timer);
  }, [query]);
  console.log("Searching for:", debouncedQuery, "on page:", page);
  return useQuery(
    ["photos", debouncedQuery, String(page)],
    () => fetchPopularPhotos(debouncedQuery, page),
    {
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true,
      onError: (error: Error) => console.log("Error fetching photos:", error),
      enabled: debouncedQuery.trim() !== "",
      retry: 2,
    }
  );
};
