import axios from "axios";
import { HOST } from "../constant/api.constant";

const axiosInstance = axios.create({
  baseURL: HOST,
  timeout: 5000, // ← لا تعلق هذا السطر
  headers: {
    Accept: "application/json",
  },
});

export default axiosInstance;
