import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "https://fly-chat-be.vercel.app/api" : "https://fly-chat-be.vercel.app/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies with the request
});
