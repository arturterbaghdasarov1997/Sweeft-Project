import axios from "axios";

const API_KEY = import.meta.env.VITE_SWEEFT_API_KEY;
const BASE_URL = "https://api.unsplash.com";

interface Photo {
  id: string;
  urls: { small: string; regular: string };
  description?: string;
  user: { name: string };
}

interface ApiResponse {
  results: Photo[];
  total: number;
}

export const fetchPopularPhotos = async (query: string, page: number): Promise<ApiResponse> => {
  const cacheKey = `cachedResults-${query}-page-${page}`;
  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    console.log("Loading from cache:", query);
    return JSON.parse(cachedData);
  }

  try {
    const response = await axios.get<ApiResponse>(`${BASE_URL}/search/photos`, {
      headers: {
        Authorization: `Client-ID ${API_KEY}`,
      },
      params: {
        query,
        page,
        per_page: 20,
        order_by: "popular",
      },
    });

    const data = response.data;
    localStorage.setItem(cacheKey, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw new Error("Error fetching photos");
  }
};