import axios from "axios";
 const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // ✅ required to send cookies cross-origin
});

export default axiosInstance;