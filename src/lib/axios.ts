import defaultAxios from "axios";
import { useAuthStore } from "../store";

const axios = defaultAxios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axios.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default axios;
