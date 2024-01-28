import { baseUrlApi } from "@/configs/config";
import axios from "axios";

export default axios.create({
  baseURL: baseUrlApi,
  headers: { "Content-Type": "application/json" },
});

export const axiosAuth = axios.create({
  baseURL: baseUrlApi,
  headers: { "Content-Type": "application/json" },
});
