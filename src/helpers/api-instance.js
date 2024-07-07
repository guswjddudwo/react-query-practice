import axios from "axios";

export const apiInstance = axios.create({
  timeout: 30000,
  baseURL: "https://jsonplaceholder.typicode.com/",
});
