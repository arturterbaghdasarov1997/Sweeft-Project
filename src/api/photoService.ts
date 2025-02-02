import axios from "axios";

const API_KEY = import.meta.env.VITE_SWEEFT_API_KEY;
const BASE_URL = "https://api.unsplash.com";

export const fetchPopularPhotos = async (query: string, page: number) => {
  const cacheKey = `cachedResults-${query}-page-${page}`;
  const cachedData = sessionStorage.getItem(cacheKey);

  if (cachedData) {
    console.log("Loading from cache:", query);
    return JSON.parse(cachedData);
  }

  try {
    const response = await axios.get(`${BASE_URL}/search/photos`, {
      params: {
        query,
        page,
        per_page: 20,
        client_id: API_KEY,
        order_by: "popular",
      },
    });

    const data = response.data;
    sessionStorage.setItem(cacheKey, JSON.stringify(data));

    return data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw new Error("Error fetching photos");
  }
};
