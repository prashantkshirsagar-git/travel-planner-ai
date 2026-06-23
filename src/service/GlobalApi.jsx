import axios from "axios";

const PEXELS_BASE_URL = 'https://api.pexels.com/v1/search';

const pexelsConfig = {
  headers: {
    Authorization: import.meta.env.VITE_PEXELS_API_KEY
  }
};

export const GetPlacePhoto = (query) =>
  axios.get(`${PEXELS_BASE_URL}?query=${encodeURIComponent(query)}&per_page=15&orientation=landscape`, pexelsConfig);