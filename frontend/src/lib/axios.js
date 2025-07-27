import axios from "axios";

// const isDev = import.meta.env.MODE === "development";

const BASE_URL="https://fly-chat-be.vercel.app/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
