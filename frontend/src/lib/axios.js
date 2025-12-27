import axios from "axios"
import { ENV } from "./env";


export const axiosInstance = axios.create({
  baseURL: `${ENV.SERVER_URL}/api`,
  withCredentials: true,
});
