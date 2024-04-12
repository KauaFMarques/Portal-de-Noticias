import axios from "axios";

export const axiosLocalApi = axios.create({
  baseURL: "http://localhost:5000",
});
