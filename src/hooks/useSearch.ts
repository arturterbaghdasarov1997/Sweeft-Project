import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchPopularPhotos } from "../api/photoService";

export const useSearch = (query: string, page: number) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(timer);
  }, [query]);

  return useQuery(
    ["photos", debouncedQuery, page],
    () => fetchPopularPhotos(debouncedQuery, page),
    {
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true,
      onError: (error: Error) => console.error("Error fetching photos:", error),
      enabled: debouncedQuery.trim() !== "",
      retry: 2,
    }
  );
};