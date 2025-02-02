import axios from "axios";

const API_KEY = import.meta.env.VITE_SWEEFT_API_KEY;
const BASE_URL = "https://api.unsplash.com";

export const fetchPopularPhotos = async (query: string, page: number) => {
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
    return response.data;
  } catch (error) {
    console.error("Error fetching photos", error);
    throw new Error("Error fetching photos");
  }
};
